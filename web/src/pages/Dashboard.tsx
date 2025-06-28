import { useEffect, useState } from "react";
import API from "../axios";

interface Habit {
  _id: string;
  title: string;
  description?: string;
  datesCompleted: string[];
}

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState({ title: "", description: "" });

  // 🧠 Fetch habits on load
  useEffect(() => {
    API.get("/habits")
      .then((res) => setHabits(res.data))
      .catch(() => alert("Couldn't fetch habits"));
  }, []);

  // ✅ Add habit
  const addHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API.post("/habits", newHabit);
    setHabits([res.data, ...habits]);
    setNewHabit({ title: "", description: "" });
  };

  // ❌ Delete habit
  const deleteHabit = async (id: string) => {
    await API.delete(`/habits/${id}`);
    setHabits(habits.filter((h) => h._id !== id));
  };

  // ✅ Mark done
  const markDone = async (id: string) => {
    const res = await API.post(`/habits/${id}/track`);
    setHabits(habits.map((h) => (h._id === id ? res.data : h)));
  };

  // 🔁 Check if marked today
  const isDoneToday = (habit: Habit) => {
    const today = new Date().toDateString();
    return habit.datesCompleted.some(
      (date) => new Date(date).toDateString() === today
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎯 Your Habits</h1>

      {/* Form */}
      <form onSubmit={addHabit} className="flex gap-2">
        <input
          value={newHabit.title}
          onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
          placeholder="New Habit"
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* Habit list */}
      {habits.length === 0 && <p className="text-center">No habits yet</p>}

      <ul className="space-y-2">
        {habits.map((habit) => (
          <li
            key={habit._id}
            className="flex justify-between items-center border p-3 rounded shadow-sm"
          >
            <div>
              <p className="font-semibold">{habit.title}</p>
              {habit.description && (
                <p className="text-sm text-gray-500">{habit.description}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => markDone(habit._id)}
                disabled={isDoneToday(habit)}
                className={`px-3 py-1 rounded text-white ${
                  isDoneToday(habit)
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600"
                }`}
              >
                {isDoneToday(habit) ? "Done ✅" : "Mark Done"}
              </button>
              <button
                onClick={() => deleteHabit(habit._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
