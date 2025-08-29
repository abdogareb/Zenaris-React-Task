import { useState } from "react";
import Modal from "../ui/Modal";

type AllergySeverity = "mild" | "severe";
type AllergyItem = { id: string; name: string; severity: AllergySeverity };
const uid = () => Math.random().toString(36).slice(2, 9);

const SEV_ORDER: Record<AllergySeverity, number> = { severe: 0, mild: 1 };
const sevLabel = (s: AllergySeverity) => (s === "mild" ? "Mild intolerance" : "Severe allergy");
const sevClass = (s: AllergySeverity) =>
  s === "mild" ? "border-amber-300 text-amber-800" : "border-red-300 text-red-800";

// Quick options shown *inside* the modal
const COMMON_ALLERGIES = ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Sesame", "Fish"];

export default function AllergiesSection({
  items,
  onChange,
  first,
}: {
  items: AllergyItem[];
  onChange: (next: AllergyItem[]) => void;
  first?: boolean;
}) {
  const [open, setOpen] = useState(false);

  // inline edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSev, setEditSev] = useState<AllergySeverity>("severe");

  const sectionClass = first ? "space-y-3" : "border-t pt-4 mt-4 space-y-3";

  const startEdit = (it: AllergyItem) => {
    setEditingId(it.id);
    setEditName(it.name);
    setEditSev(it.severity);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditSev("severe");
  };
  const saveEdit = (id: string) => {
    const n = editName.trim();
    if (!n) return;
    onChange((items || []).map((x) => (x.id === id ? { ...x, name: n, severity: editSev } : x)));
    cancelEdit();
  };
  const remove = (id: string) => onChange((items || []).filter((x) => x.id !== id));

  const sorted = [...(items || [])].sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]);

  return (
    <section className={sectionClass}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide text-neutral-900">Food Intolerances / Allergies</h3>
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-black px-3 py-1.5 text-white hover:bg-gray-800"
        >
          + Add
        </button>
      </div>

      <ul className="divide-y divide-neutral-200 border rounded-md">
        {sorted.length === 0 && (
          <li className="p-2 text-sm text-neutral-500">No allergies/intolerances yet.</li>
        )}

        {sorted.map((it) =>
          editingId === it.id ? (
            <li key={it.id} className="flex flex-wrap items-center gap-2 p-2">
              <select
                value={editSev}
                onChange={(e) => setEditSev(e.target.value as AllergySeverity)}
                className="rounded-md border px-2 py-1"
              >
                <option value="mild">Mild intolerance</option>
                <option value="severe">Severe allergy</option>
              </select>

              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(it.id)}
                className="flex-1 rounded-md border px-2 py-1 focus:ring-2 focus:ring-emerald-500"
                placeholder="Name"
              />

              <button
                onClick={() => saveEdit(it.id)}
                className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="rounded-md border px-3 py-1.5 hover:bg-neutral-50"
              >
                Cancel
              </button>
            </li>
          ) : (
            <li key={it.id} className="flex items-center justify-between gap-3 p-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`rounded-full border px-2 py-0.5 text-xs ${sevClass(it.severity)} shrink-0`}>
                  {sevLabel(it.severity)}
                </span>
                <span className="truncate">{it.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(it)}
                  className="rounded-md border px-2 py-1 text-sm hover:bg-neutral-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(it.id)}
                  className="rounded-md border px-2 py-1 text-sm hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </li>
          )
        )}
      </ul>

      <AddAllergyModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(payload) => {
          const label = payload.name.trim();
          if (!label) return;
          const lower = label.toLowerCase();
          const existing = (items || []).find((a) => a.name.toLowerCase() === lower);
          if (existing) {
            onChange((items || []).map((a) => (a.name.toLowerCase() === lower ? { ...a, severity: payload.severity } : a)));
          } else {
            onChange([...(items || []), { id: uid(), name: label, severity: payload.severity }]);
          }
          setOpen(false);
        }}
      />
    </section>
  );
}

function AddAllergyModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (v: { name: string; severity: AllergySeverity }) => void;
}) {
  const [name, setName] = useState("");
  const [sev, setSev] = useState<AllergySeverity>("severe");

  const pick = (label: string) => {
    setName(label);
    setSev("severe");
  };

  const submit = () => {
    const n = name.trim();
    if (!n) return;
    onSave({ name: n, severity: sev });
    setName("");
    setSev("severe");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Intolerance / Allergy"
      actions={
        <>
          <button className="rounded-md border px-3 py-1.5 hover:bg-neutral-50" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800" onClick={submit}>
            Save
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map((label) => (
            <button
              key={label}
              onClick={() => pick(label)}
              title="Click to fill and set severity to Severe"
              className="rounded-full border px-3 py-1 text-xs hover:bg-neutral-50"
            >
              {label}
            </button>
          ))}
        </div>

        <label className="block">
          <div className="text-sm">Name</div>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="mt-1 w-full rounded-md border px-2 py-1 focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g., lactose, nuts"
          />
        </label>
        <label className="block">
          <div className="text-sm">Severity</div>
          <select
            value={sev}
            onChange={(e) => setSev(e.target.value as AllergySeverity)}
            className="mt-1 w-full rounded-md border px-2 py-1"
          >
            <option value="mild">Mild intolerance</option>
            <option value="severe">Severe allergy</option>
          </select>
        </label>
      </div>
    </Modal>
  );
}
