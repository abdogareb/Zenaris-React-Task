import { Link } from "react-router-dom";
import React from "react";

type Prefs = { favorites: any[]; dislikes: any[]; allergies: any[]; notes: string };
type Individual = { id: string; name: string; birthdate?: string; preferences: Prefs };

function formatDate(iso: string | undefined) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function Home({
  individuals,
  setIndividuals,
}: {
  individuals: Individual[];
  setIndividuals: React.Dispatch<React.SetStateAction<Individual[]>>;
}) {
  const empty = individuals.length === 0;

  return (
    <section className="space-y-4 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Individuals</h1>
        <Link
          to="/new"
          className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-800"
        >
          + Add
        </Link>
      </div>

      {empty ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-neutral-600">
          <div className="text-lg font-medium">No individuals yet</div>
          <div className="mt-1">
            Start by{" "}
            <Link to="/new" className="font-medium text-black underline">
              adding one
            </Link>
            .
          </div>
        </div>
      ) : (
        <div className="grid gap-3">
          {individuals.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
              <div>
                <Link to={`/${i.id}`} className="font-medium hover:underline">{i.name}</Link>
                <div className="text-sm text-neutral-500">
                  {i.birthdate ? `Birthdate ${formatDate(i.birthdate)}` : ""}
                </div>
              </div>
              <button
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-red-50"
                onClick={() => setIndividuals((prev) => prev.filter((p) => p.id !== i.id))}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
