"use client";

import React from "react";
import { usePublicRoadmaps } from "@/lib/queries/usePublicRoadmaps";
import RoadmapCard from "@/app/components/roadmap/RoadmapCard";
import SkeletonCard from "@/app/components/roadmap/SkeletonCard";

export default function LandingPage() {
  const { data, isLoading, error } = usePublicRoadmaps(3);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-cover bg-center">
      <div className="p-6 rounded-lg shadow-lg text-center space-y-6 bg-secondary/90 backdrop-blur-sm w-full">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Roadmap Creator</h1>
        <p className="mb-4 text-lg text-center text-white">
          Generate your personalized roadmap for the day. Stay organized, set your goals, and track your progress!
        </p>
      </div>

      <div className="w-full max-w-6xl mt-4">
        <h2 className="text-2xl font-bold mb-4 text-primary">Last Public Roadmaps</h2>
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