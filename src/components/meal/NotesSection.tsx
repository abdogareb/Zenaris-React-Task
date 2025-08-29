export default function NotesSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const limit = 500;
  const remaining = limit - (value?.length || 0);

  return (
    <section className="border-t pt-4 mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide text-neutral-900">
          Additional Considerations
        </h3>
      </div>

      <div className="space-y-2">
        <textarea
          rows={4}
          maxLength={limit}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-black"
          placeholder="Texture, temperature, cultural/religious restrictions, etc."
        />
        <div className="text-right text-xs text-neutral-500">
          {remaining} characters remaining
        </div>
      </div>
    </section>
  );
}
