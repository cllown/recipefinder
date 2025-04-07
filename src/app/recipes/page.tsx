import Image from 'next/image';
import Link from 'next/link';

async function getRecipes(searchParams: any) {
  const { query = '', cuisine = '', maxReadyTime = '' } = searchParams;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params.toString()}&apiKey=${apiKey}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch recipes');
  
  return res.json();
}

export default async function RecipesPage({ searchParams }: { searchParams: any }) {
  const data = await getRecipes(searchParams);
  const recipes = data.results || [];

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-black">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
         ← Back to search
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Found Recipes 🍽️</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe: any) => (
          <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
