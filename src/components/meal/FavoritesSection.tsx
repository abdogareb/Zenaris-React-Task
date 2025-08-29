import { useState } from "react";
import Modal from "../ui/Modal";

type MealCategory = "Breakfast" | "Lunch" | "Dinner" | "Snacks";
type FavoriteItem = { id: string; name: string; category: MealCategory };

const CATS: MealCategory[] = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const CAT_ORDER: Record<MealCategory, number> = {
  Breakfast: 0,
  Lunch: 1,
  Dinner: 2,
  Snacks: 3,
};
const uid = () => Math.random().toString(36).slice(2, 9);

export default function FavoritesSection({
  items,
  onChange,
}: {
  items: FavoriteItem[];
  onChange: (next: FavoriteItem[]) => void;
}) {
  const [open, setOpen] = useState(false);

  // inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCat, setEditCat] = useState<MealCategory>("Breakfast");

  const startEdit = (it: FavoriteItem) => {
    setEditingId(it.id);
    setEditName(it.name);
    setEditCat(it.category);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditCat("Breakfast");
  };
  const saveEdit = (id: string) => {
    const n = editName.trim();
    if (!n) return;
    onChange((items || []).map((x) => (x.id === id ? { ...x, name: n, category: editCat } : x)));
    cancelEdit();
  };
  const remove = (id: string) => onChange((items || []).filter((x) => x.id !== id));

  const sorted = [...(items || [])].sort(
    (a, b) => CAT_ORDER[a.category] - CAT_ORDER[b.category]
  );

  return (
    <section className="border-t pt-4 mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide text-neutral-900">Favorite Foods</h3>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800"
        >
          + Add
        </button>
      </div>

      <ul className="divide-y divide-neutral-200 border rounded-md">
        {sorted.length === 0 && (
          <li className="p-2 text-sm text-neutral-500">No favorites yet.</li>
        )}

        {sorted.map((it) =>
          editingId === it.id ? (
            <li key={it.id} className="flex flex-wrap items-center gap-2 p-2">
              <select
                value={editCat}
                onChange={(e) => setEditCat(e.target.value as MealCategory)}
                className="rounded-md border px-2 py-1"
              >
                {CATS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(it.id)}
                className="flex-1 rounded-md border px-3 py-1.5 focus:ring-2 focus:ring-emerald-500"
                placeholder="Food name"
              />

              <button onClick={() => saveEdit(it.id)} className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800">
                Save
              </button>
              <button onClick={cancelEdit} className="rounded-md border px-3 py-1.5 hover:bg-neutral-50">
                Cancel
              </button>
            </li>
          ) : (
            <li key={it.id} className="flex items-center justify-between gap-3 p-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="rounded-full border px-2 py-0.5 text-xs text-neutral-700 shrink-0">
                  {it.category}
                </span>
                <span className="truncate">{it.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(it)} className="rounded-md border px-2 py-1 text-sm hover:bg-neutral-50">
                  Edit
                </button>
                <button onClick={() => remove(it.id)} className="rounded-md border px-2 py-1 text-sm hover:bg-red-50">
                  Remove
                </button>
              </div>
            </li>
          )
        )}
      </ul>

      <AddFavoriteModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(payload) => {
          onChange([...(items || []), { id: uid(), ...payload }]);
          setOpen(false);
        }}
      />
    </section>
  );
}

function AddFavoriteModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (v: { name: string; category: MealCategory }) => void;
}) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState<MealCategory>("Breakfast");

  const submit = () => {
    const n = name.trim();
    if (!n) return;
    onSave({ name: n, category: cat });
    setName("");
    setCat("Breakfast");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Favorite"
      actions={
        <>
          <button className="rounded-md border px-3 py-1.5 hover:bg-neutral-50" onClick={onClose}>Cancel</button>
          <button className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800"onClick={submit}>Save</button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <div className="text-sm">Food name</div>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="mt-1 w-full rounded-md border px-2 py-1 focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g., oatmeal"
          />
        </label>
        <label className="block">
          <div className="text-sm">Category</div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as MealCategory)}
            className="mt-1 w-full rounded-md border px-2 py-1"
          >
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>
    </Modal>
  );
}
