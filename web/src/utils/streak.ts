export function calculateStreaks(dates: string[]) {
  if (!dates.length) return { current: 0, best: 0 };

  const sorted = [...dates]
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  let current = 0;
  let best = 0;
  let streak = 1;

  for (let i = 1; i < sorted.length; i++) {
    const diff = Math.floor(
      (sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff === 1) {
      streak++;
    } else if (diff === 0) {
      continue; // same day, skip
    } else {
      best = Math.max(best, streak);
      streak = 1;
    }
  }

  best = Math.max(best, streak);

  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const lastDate = sorted[sorted.length - 1].toDateString();
  const secondLast =
    sorted.length > 1 ? sorted[sorted.length - 2].toDateString() : undefined;

  const todayDone = lastDate === today;
  const yesterdayDone =
    lastDate === yesterday.toDateString() ||
    (secondLast === yesterday.toDateString() && todayDone);

  current = todayDone ? streak : yesterdayDone ? streak - 1 : 0;

  return { current, best };
}
