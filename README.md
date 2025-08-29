# Elderly Meal Preferences

A simple React + Vite + TailwindCSS frontend app for managing **meal preferences of elderly individuals**.  
This project was built as part of the **Zenaris Quick Coding Challenge**.

---

## ✨ Features

- **Homepage**
  - List of individuals with name & birthdate
  - Add new individual

- **Individual Detail Page**
  - View and edit meal preferences:
    - Favorite foods (sorted by category)
    - Disliked foods (sorted by severity)
    - Food intolerances / allergies (sorted by severity, with quick-select for common allergies)
    - Additional notes (cultural, religious, texture, etc.)
  - Inline edit, remove, and add via modal dialogs

- **UI/UX**
  - TailwindCSS with a **warm cream background** (brand-inspired look)
  - White rounded cards for content
  - Deep teal primary buttons
  - Simple modals for adding new items

---

## 🛠️ Tech Stack

- [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
- [TailwindCSS](https://tailwindcss.com/) (customized with brand colors)
- [React Router](https://reactrouter.com/) for navigation
- TypeScript (kept lightweight)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/elderly-meal-preferences.git
cd elderly-meal-preferences
```

### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) (≥18) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed.

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the app running locally.

### 4. Build for production

```bash
npm run build
```

The output will be generated in the `dist/` folder.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── meal/
│   │   ├── FavoritesSection.tsx
│   │   ├── DislikesSection.tsx
│   │   ├── AllergiesSection.tsx
│   │   ├── NotesSection.tsx
│   │   └── index.tsx
│   └── ui/
│       └── Modal.tsx
├── pages/
│   ├── Home.tsx
│   └── IndividualDetail.tsx
│   └── NewIndividual.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## 📖 Notes

- Data is stored in local React state only (no backend required).
- IDs for individuals and preferences are generated with `Math.random()`.
- Modals are self-contained and triggered from each section.
- Project is intentionally simple and lightweight, focusing on clear UI/UX.


