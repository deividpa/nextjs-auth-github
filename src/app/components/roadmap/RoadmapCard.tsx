"use client";

import Link from "next/link";
import { Roadmap } from "@/types/roadmap";
import { Button } from "../ui/Button";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = async () => {
    setLoading(true);
    await router.push(`/roadmap/${roadmap.id}`);
  };

  return (
    <div className="text-primary border rounded-md p-4 shadow hover:shadow-lg transition">
      <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
      {roadmap.description && (
        <p className="mb-2 text-gray-700">{roadmap.description}</p>
      )}
      <Link href={`/roadmap/${roadmap.id}`}>
        <Button
          variant="outline"
          className="mt-4"
          onClick={handleNavigation}
          loading={loading}
        >
          <span className="inline-flex items-center">
            <FaEye className="mr-2" />
            <span>View Details</span>
          </span>
        </Button>
      </Link>
    </div>
  );
}
