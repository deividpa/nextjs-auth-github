import Link from "next/link";
import { Roadmap } from "@/types/roadmap";


export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition">
      <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
      {roadmap.description && (
        <p className="mb-2 text-gray-700">{roadmap.description}</p>
      )}
      <Link href={`/roadmap/${roadmap.id}`}>
        <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Ver Detalles
        </button>
      </Link>
    </div>
  );
}
