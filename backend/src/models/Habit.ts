import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  userId: string;
  title: string;
  description?: string;
  datesCompleted: Date[];
}

const HabitSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    datesCompleted: { type: [Date], default: [] },
  },
  { timestamps: true }
);

const HabitModel = mongoose.model<IHabit>("Habit", HabitSchema);

export default HabitModel;
