
import Link from 'next/link';

interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

interface SubCardProps {
  subcategories: Subcategory[];
}

export default function SubCard({ subcategories }: SubCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border">
      <ul className="space-y-2">
        {subcategories.map((sub) => (
          <li key={sub.id}>
            <Link
              href={`/category/${sub.slug}`}
              className="block py-2 px-3 rounded hover:bg-gray-50 transition-colors"
            >
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
