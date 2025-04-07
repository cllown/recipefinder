import Image from 'next/image';
import Link from 'next/link';

async function getRecipes(searchParams: any) {
  const { query = '', cuisine = '', maxReadyTime = '' } = searchParams;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}&apiKey=${apiKey}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error('Failed to fetch recipes');

  return res.json();
}

export default async function RecipesList({ searchParams }: { searchParams: any }) {
  const params = await searchParams;

  const data = await getRecipes(params);
  const recipes = data.results || [];

  if (!recipes.length) {
    return <p className="text-center text-gray-600">No recipes found 😕</p>;
  }

  return (
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
  );
}
