import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import NewIndividual from "./pages/NewIndividual";
import IndividualDetail from "./pages/IndividualDetail";

type Prefs = { favorites: any[]; dislikes: any[]; allergies: any[]; notes: string };
type Individual = { id: string; name: string; birthdate?: string; preferences: Prefs };

export default function App() {
  const [individuals, setIndividuals] = useState<Individual[]>([
    { id: "1", name: "Maria Hoffmann", birthdate: "1946-04-11", preferences: { favorites: [], dislikes: [], allergies: [], notes: "" } },
    { id: "2", name: "Karl Müller",    birthdate: "1939-10-02", preferences: { favorites: [], dislikes: [], allergies: [], notes: "" } },
  ]);

  return (
    <BrowserRouter>
      <main className="min-h-screen0 text-neutral-900">
        <header className="sticky top-0 z-20 border-b backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
            <Link to="/" className="text-xl font-semibold">Zenaris -   Meal Preferences</Link>
          </div>
        </header>

        <div className="py-6">
          <Routes>
            <Route path="/" element={<Home individuals={individuals} setIndividuals={setIndividuals} />} />
            <Route path="/new" element={<NewIndividual setIndividuals={setIndividuals} />} />
            <Route path="/:id" element={<IndividualDetail individuals={individuals} setIndividuals={setIndividuals} />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}
