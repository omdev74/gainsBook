import { useState, useEffect, useMemo, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";

type Exercise = {
  _id: string;
  name: string;
  equipment: { id?: number; name: string;[key: string]: unknown }[]; // id optional because custom might not have it
  muscle: string;
  sets: number;
  description: string;
  imageUrl: string;
  exerciseType: "DefaultExercise" | "CustomExercise"; // <-- new field
};

const backendURI = import.meta.env.VITE_BACKEND_URI;

export function useExercises() {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState<string[]>([]);
  const [muscleFilter, setMuscleFilter] = useState<string[]>([]);
  const [exerciseTypeFilter, setExerciseTypeFilter] = useState<"All" | "DefaultExercise" | "CustomExercise">("All");

  const [sortBy, setSortBy] = useState<"name" | "sets">("name");

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setExercises([]);
      setError(null);
      return;
    }

    const fetchExercises = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching default and custom exercises...");

        const [defaultRes, customRes] = await Promise.all([
          axios.get(`${backendURI}/defaultexercises`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${backendURI}/customexercises`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!Array.isArray(customRes.data?.customExercises)) {
          console.warn("customExercises was not an array", customRes.data?.customExercises);
        }


        // Map default exercises
        const defaultExercises = Array.isArray(defaultRes.data)
          ? defaultRes.data.map((exercise: any) => ({
            _id: exercise.uuid || exercise._id?.$oid || "unknown-id",
            name: exercise.name ?? "Unknown Name",
            equipment: exercise.equipment ?? [],
            muscle: exercise.category?.name ?? "Unknown",
            sets: exercise.sets ?? 0,
            description: exercise.description ?? "No description provided.",
            imageUrl: exercise.images?.[0] ?? "",
            exerciseType: "DefaultExercise" as const,
            
          }))
          : [];

        // Map custom exercises safely
        const customExercises = Array.isArray(customRes.data?.customExercises)
          ? customRes.data.customExercises.map((exercise: any) => ({
            _id: exercise._id ?? "unknown-id",
            name: exercise.name ?? "Unknown Name",
            equipment: [{ name: exercise.equipment ?? "Unknown" }],
            muscle: exercise.muscle ?? "Unknown",
            sets: 0, // still assuming 0 sets for custom
            description: exercise.type ?? "No description provided.",
            imageUrl: "",
            exerciseType: "CustomExercise" as const,
          }))
          : [];

        const combinedExercises = [...defaultExercises, ...customExercises];

        setExercises(combinedExercises);
      } catch (err: any) {
        console.error("Error fetching exercises:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized: Please log in again.");
        } else if (!err.response) {
          setError("Network error: Unable to fetch data.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch exercises.");
        }
      } finally {
        
        setLoading(false);
      }
    };


    fetchExercises();
  }, [isLoggedIn, token]);

  // Filter and sort
  const filteredAndSortedExercises = useMemo(() => {
    if (!Array.isArray(exercises)) return [];
    return exercises
      .filter((exercise) => {
        const equipmentNames = exercise.equipment.map((eq) => eq.name.toLowerCase());
        return (
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (equipmentFilter.length === 0 || equipmentFilter.some((filter) => equipmentNames.includes(filter.toLowerCase()))) &&
          (muscleFilter.length === 0 || muscleFilter.includes(exercise.muscle)) &&
          (exerciseTypeFilter === "All" || exercise.exerciseType === exerciseTypeFilter)
        );
      })
      .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : b.sets - a.sets));
  }, [exercises, searchTerm, equipmentFilter, muscleFilter, sortBy]);

  const getExerciseById = async (id: string) => {
    if (exercises.length > 0) {
      return exercises.find(exercise => exercise._id === id);
    }
  };

  const uniqueEquipment = useMemo(() => {
    const equipmentSet = new Set<string>();
    exercises.forEach((exercise) => {
      exercise.equipment.forEach((eq) => equipmentSet.add(eq.name));
    });
    return Array.from(equipmentSet);
  }, [exercises]);

  const uniqueMuscles = useMemo(() => {
    return Array.from(new Set(exercises.map((e) => e.muscle)));
  }, [exercises]);

  return {
    exercises: filteredAndSortedExercises,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    equipmentFilter,
    setEquipmentFilter,
    muscleFilter,
    setMuscleFilter,
    sortBy,
    setSortBy,
    uniqueEquipment,
    uniqueMuscles,
    getExerciseById, exerciseTypeFilter,
    setExerciseTypeFilter,
  };
}
