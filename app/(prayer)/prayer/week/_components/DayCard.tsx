"use client";

import { useEffect, useState } from "react";
import { ScriptureCard, type Scripture } from "./ScriptureCard";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type Day = {
  day?: string | null;
  focus?: string | null;
  prompt?: string | null;
  scriptures?: Scripture[] | null;
};

/**
 * One weekday's prayer points. Highlights itself when the visitor's local day
 * matches — computed after mount so there's no server/client mismatch.
 */
export default function DayCard({ day }: { day: Day }) {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    setIsToday(WEEKDAYS[new Date().getDay()] === day.day);
  }, [day.day]);

  const anchor = day.day ? `day-${day.day.toLowerCase()}` : undefined;
  const scriptures = day.scriptures ?? [];

  return (
    <section
      id={anchor}
      className={`scroll-mt-28 rounded-2xl border bg-white p-6 transition-shadow md:p-8 ${
        isToday
          ? "border-[#e31e24] shadow-lg ring-2 ring-[#e31e24]/20"
          : "border-gray-200 shadow-sm"
      }`}
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold uppercase tracking-wider text-[#e31e24]">
          {day.day}
        </span>
        {isToday && (
          <span className="rounded-full bg-[#e31e24] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
            Today
          </span>
        )}
      </div>

      {day.focus && (
        <h3 className="text-2xl font-bold leading-tight text-gray-900">
          {day.focus}
        </h3>
      )}

      {day.prompt && (
        <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
          {day.prompt}
        </p>
      )}

      {scriptures.length > 0 && (
        <div className="mt-6 grid gap-4">
          {scriptures.map((s, i) => (
            <ScriptureCard key={`${anchor}-${i}`} scripture={s} />
          ))}
        </div>
      )}
    </section>
  );
}
