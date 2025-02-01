import { useState, useEffect, useMemo, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";

type Exercise = {
  id: string; // Using string because _id is in MongoDB ObjectId format
  name: string;
  equipment: { id: number; name: string;[key: string]: unknown; }[]; // Updated to match the returned data
  muscle: string; // Derived from category.name
  sets: number;
  description: string;
  imageUrl: string; // You may need to map this from `images` if it exists
};

const backendURI = import.meta.env.VITE_BACKEND_URI;

export function useExercises() {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters and Sorting States
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState<string[]>([]);
  const [muscleFilter, setMuscleFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "sets">("name");

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setExercises([]); // Clear exercises when logged out
      setError(null);
      return;
    }

    const fetchExercises = async () => {
      setLoading(true);
      setError(null);

      try {

        console.log("firring the exercises fethch api instide the useExercise hook");
        const response = await axios.get(`${backendURI}/exercises`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // Map backend data to your frontend format
        const mappedExercises = response.data.map((exercise: any) => ({
          id: exercise.uuid || exercise._id?.$oid || "unknown-id",
          name: exercise.name ?? "Unknown Name",
          equipment: exercise.equipment ?? [],
          muscle: exercise.category?.name ?? "Unknown",
          sets: exercise.sets ?? 0,
          description: exercise.description ?? "No description provided.",
          imageUrl: exercise.images?.[0] ?? "",
        }));

        setExercises(mappedExercises);
      } catch (err: any) {
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

  // Filter and Sort Logic
  const filteredAndSortedExercises = useMemo(() => {
    if (!Array.isArray(exercises)) return [];
    return exercises
      .filter((exercise) => {
        const equipmentNames = exercise.equipment.map((eq) => eq.name.toLowerCase());
        return (
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (equipmentFilter.length === 0 || equipmentFilter.some((filter) => equipmentNames.includes(filter.toLowerCase()))) &&
          (muscleFilter.length === 0 || muscleFilter.includes(exercise.muscle))
        );
      })
      .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : b.sets - a.sets));
  }, [exercises, searchTerm, equipmentFilter, muscleFilter, sortBy]);

  const getExerciseById = async (id: string) => {

    if (exercises.length > 0) {
      // console.log(`id provided in the hook ${id} when ${exercises}`);
      return exercises.find(exercise => exercise.id === id);
    }
  };
  // Unique Equipment and Muscles
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
    getExerciseById
  };
}
