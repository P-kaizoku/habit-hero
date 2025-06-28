import { Request, Response } from "express";
import Habit from "../models/Habit";
import { AuthRequest } from "../types/authRequest";

export const getHabits = async (req: AuthRequest, res: Response) => {
  const habits = await Habit.find({ userId: req.userId });
  res.json(habits);
};

export const createHabit = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const newHabit = new Habit({ userId: req.userId, title, description });
  await newHabit.save();
  res.status(201).json(newHabit);
};

export const updateHabit = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updated = await Habit.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { title, description },
    { new: true }
  );
  res.json(updated);
};

export const deleteHabit = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await Habit.findOneAndDelete({ _id: id, userId: req.userId });
  res.json({ message: "Habit deleted" });
};

export const markHabitDone = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize time

  const habit = await Habit.findOne({ _id: id, userId: req.userId });
  if (!habit) {
    res.status(404).json({ message: "Habit not found" });
    return;
  }

  const alreadyMarked = habit.datesCompleted.some(
    (date) => new Date(date).toDateString() === today.toDateString()
  );

  if (alreadyMarked) {
    res.status(400).json({ message: "Already marked for today" });
    return;
  }

  habit.datesCompleted.push(today);
  await habit.save();
  res.json(habit);
};
