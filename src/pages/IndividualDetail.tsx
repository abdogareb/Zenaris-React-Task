import { useParams, Link, useNavigate } from "react-router-dom";
import React from "react";
import MealPreferencesForm from "../components/meal";

type Prefs = { favorites: any[]; dislikes: any[]; allergies: any[]; notes: string };
type Individual = { id: string; name: string; birthdate?: string; preferences: Prefs };

function formatDate(iso: string | undefined) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function IndividualDetail({
  individuals,
  setIndividuals,
}: {
  individuals: Individual[];
  setIndividuals: React.Dispatch<React.SetStateAction<Individual[]>>;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const person = individuals.find((p) => p.id === id);

  if (!person) {
    return (
      <div className="max-w-3xl mx-auto p-6 rounded-2xl border bg-white">
        <div className="text-lg font-semibold">Individual not found</div>
        <div className="mt-1">
          <Link to="/" className="underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const updatePrefs = (prefs: Prefs) => {
    setIndividuals((prev) =>
      prev.map((p) => (p.id === person.id ? { ...p, preferences: prefs } : p))
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-4 space-y-4">
      <button
        onClick={() => navigate("/")}
        className="mt-4 rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 hover:border-neutral-300"
      >
        ← Back
      </button>

      <h1 className="text-xl font-semibold">{person.name}</h1>
      <div className="text-sm text-neutral-500">
        {person.birthdate ? `Birthdate ${formatDate(person.birthdate)}` : ""}
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <MealPreferencesForm
          personName={person.name}
          value={person.preferences}
          onChange={updatePrefs}
        />
      </div>
    </section>
  );
}
