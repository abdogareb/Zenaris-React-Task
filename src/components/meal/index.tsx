type Prefs = { favorites: any[]; dislikes: any[]; allergies: any[]; notes: string };

export default function MealPreferencesForm({
  personName,
  value,
  onChange,
}: {
  personName: string;
  value: Prefs;
  onChange: (next: Prefs) => void;
}) {
  const set = (patch: Partial<Prefs>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-600">Record meal preferences for <b>{personName}</b>.</p>

      <FavoritesSection items={value.favorites || []} onChange={(items) => set({ favorites: items })} />
      <DislikesSection  items={value.dislikes  || []} onChange={(items) => set({ dislikes: items })} />
      <AllergiesSection items={value.allergies || []} onChange={(items) => set({ allergies: items })} />
      <NotesSection     value={value.notes || ""} onChange={(notes) => set({ notes })} />
    </div>
  );
}

import FavoritesSection from "./FavoritesSection";
import DislikesSection from "./DislikesSection";
import AllergiesSection from "./AllergiesSection";
import NotesSection from "./NotesSection";
