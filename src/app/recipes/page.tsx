import Link from 'next/link';
import { Suspense } from 'react';
import RecipesList from './RecipesList';

export default function RecipesPage({ searchParams }: { searchParams: any }) {
  return (
    <main className="min-h-screen p-8 bg-gray-100 text-black">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to search
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Found Recipes 🍽️</h1>

      <Suspense fallback={<p className="text-center text-gray-600">Loading recipes...</p>}>
        <RecipesList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
