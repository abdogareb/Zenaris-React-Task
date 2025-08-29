import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

type Prefs = { favorites: any[]; dislikes: any[]; allergies: any[]; notes: string };
type Individual = { id: string; name: string; birthdate?: string; preferences: Prefs };
const uid = () => Math.random().toString(36).slice(2, 9);

export default function NewIndividual({
  setIndividuals,
}: {
  setIndividuals: React.Dispatch<React.SetStateAction<Individual[]>>;
}) {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  return (
    <section className="max-w-xl mx-auto px-4 space-y-4">
      <h1 className="text-xl font-semibold">Add Individual</h1>
      <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-xl border p-2.5" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Birthdate</label>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border p-2.5"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800"
            onClick={() => {
              if (!name.trim()) return alert("Please enter a name.");
              setIndividuals((prev) => [
                {
                  id: uid(),
                  name: name.trim(),
                  birthdate: birthdate || undefined,
                  preferences: { favorites: [], dislikes: [], allergies: [], notes: "" },
                },
                ...prev,
              ]);
              nav("/");
            }}
          >
            Save
          </button>
          <button className="rounded-xl border px-4 py-2" onClick={() => nav(-1)}>Cancel</button>
        </div>
      </div>
    </section>
  );
}
