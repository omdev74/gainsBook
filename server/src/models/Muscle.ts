// backend/models/Muscle.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Muscle extends Document {
    id: number;                    // Unique ID for the muscle (e.g., 1, 2, 3)
    name: string;                  // Name of the muscle (e.g., 'Biceps brachii')
    name_en: string;               // English name of the muscle (e.g., 'Biceps')
    is_front: boolean;             // Whether the muscle is on the front (true) or back (false)
    image_url_main: string;        // Main image URL for the muscle
    image_url_secondary: string;   // Secondary image URL for the muscle
}

const MuscleSchema = new Schema<Muscle>({
    id: { type: Number, required: true, unique: true }, // Unique ID for muscle
    name: { type: String, required: true },             // Name of the muscle
    name_en: { type: String, required: true },          // English name of the muscle
    is_front: { type: Boolean, required: true },        // Whether it's a front muscle
    image_url_main: { type: String, required: true },   // URL for main image
    image_url_secondary: { type: String, required: true }, // URL for secondary image
}, { timestamps: true });

const MuscleModel = mongoose.model<Muscle>('Muscle', MuscleSchema);

export default MuscleModel;
