import Image from 'next/image';
import Link from 'next/link';

async function getRecipeDetails(id: string) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch recipe details');
  return res.json();
}
interface RecipeDetailPageProps {
  params: { id: string };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const recipe = await getRecipeDetails(params.id);

  return (
    <main className="min-h-screen p-8 bg-white text-black max-w-3xl mx-auto">
      <Link href="/recipes" className="text-blue-600 hover:underline mb-4 inline-block">
         ← Back to results
      </Link>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      <Image
        src={recipe.image}
        alt={recipe.title}
        width={600}
        height={400}
        className="rounded-xl object-cover mb-6"
      />

      <p className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

      <div>
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 mb-6">
          {recipe.extendedIngredients.map((ing: any) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <p dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available.' }} />
      </div>
    </main>
  );
}
