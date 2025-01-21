import mongoose from "mongoose";

const ExerciseBaseSchema = new mongoose.Schema({
  uuid: { type: String, unique: true }, // Unique identifier
  id: Number,
  created: Date,
  last_update: Date,
  last_update_global: Date,
  category: Object,
  muscles: Array,
  muscles_secondary: Array,
  equipment: Array,
  license: Object,
  license_author: String,
  images: Array,
  exercises: Array,
  variations: Number,
  videos: Array,
  author_history: Array,
  total_authors_history: Array,
});

export default mongoose.model("ExerciseBaseInfo", ExerciseBaseSchema);

