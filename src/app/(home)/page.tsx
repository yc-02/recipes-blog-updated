import Image from "next/image";
import RecipeCard from "../(recipes)/RecipeCard";


export default function Home() {
  return (
    <main className="flex flex-col px-16 py-6 gap-6">
      <header>
        <h2 className="text-4xl font-semibold text-neutral-600">Recipes</h2>
        <h3 className="text-lg font-semibold text-neutral-500">Healthy and Delicious Creations</h3>
      </header>
      <div>
      <RecipeCard/>
      </div>
    </main>
  );
}
