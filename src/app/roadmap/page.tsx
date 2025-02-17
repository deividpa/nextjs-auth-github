"use client";

import React from "react";
import { usePublicRoadmaps } from "@/lib/queries/usePublicRoadmaps";
import RoadmapCard from "@/app/components/roadmap/RoadmapCard";
import SkeletonCard from "@/app/components/roadmap/SkeletonCard";
import { RiCompassDiscoverLine } from "react-icons/ri";

export default function PublicRoadmapsPage() {
  const { data, isLoading, error } = usePublicRoadmaps();

  return (
    <div className="p-4">
      {/* Descriptive message */}
      <div className="mb-8 bg-neutral p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-4 inline-flex items-center">
          <RiCompassDiscoverLine /><span className="ml-2">Discover Roadmaps</span>
        </h2>
        <p className="text-gray-700 text-lg">
          Roadmaps are visual guides for achieving goals and organizing projects.
          With AI, you can craft smart, personalized plans that turn your ideas into action.
        </p>
      </div>

      {/* Roadmap content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : error ? (
        <p className="p-4 text-center text-red-600">
          Error loading the roadmaps
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      )}
    </div>
  );
}