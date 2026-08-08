/**
 * Presentational card for a single scripture. Plain (no hooks / server-only
 * imports) so it can render in both server and client components.
 */
export type Scripture = {
  reference?: string | null;
  translation?: string | null;
  text?: string | null;
};

export function ScriptureCard({ scripture }: { scripture: Scripture }) {
  return (
    <figure className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <blockquote className="text-[17px] leading-relaxed text-gray-800">
        {scripture.text}
      </blockquote>
      <figcaption className="mt-3 text-sm font-bold text-[#e31e24]">
        {scripture.reference}
        {scripture.translation ? (
          <span className="font-semibold text-gray-400"> · {scripture.translation}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
