import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Habit {
  title: string;
  datesCompleted: string[];
}

export default function WeeklyChart({ habits }: { habits: Habit[] }) {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const data = last7Days.map((day) => {
    const dayStr = day.toDateString();
    let total = 0;

    habits.forEach((habit) => {
      if (
        habit.datesCompleted.some(
          (date) => new Date(date).toDateString() === dayStr
        )
      ) {
        total++;
      }
    });

    return {
      day: day.toLocaleDateString("en-IN", { weekday: "short" }),
      completed: total,
    };
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">📊 Weekly Progress</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
