"use client";

import React from "react";
import { usePublicRoadmaps } from "@/lib/queries/usePublicRoadmaps";
import RoadmapCard from "@/app/components/roadmap/RoadmapCard";
import SkeletonCard from "@/app/components/roadmap/SkeletonCard";

export default function LandingPage() {
  const { data, isLoading, error } = usePublicRoadmaps(3);

  return (
    <div className="flex flex-col items-center p-4 bg-cover bg-center">
      <div className="p-6 rounded-lg shadow-md space-y-6 bg-neutral backdrop-blur-sm w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to Roadmap Creator</h1>
        <p className="mb-4 text-lg text-primary">
          Generate your personalized roadmap for the day. Stay organized, set your goals, and track your progress!
        </p>
      </div>

      <div className="w-full max-w-6xl mt-9">
        <h2 className="text-xl font-bold mb-4 text-primary bg-accent/5 rounded-xl">Last Public Roadmaps</h2>
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )}
        {error && <p className="p-4 text-center text-red-600">Error loading the roadmaps</p>}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}