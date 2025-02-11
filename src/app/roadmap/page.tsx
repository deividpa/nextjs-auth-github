"use client";

import React from "react";
import { usePublicRoadmaps } from "@/lib/queries/usePublicRoadmaps";
import RoadmapCard from "@/app/components/roadmap/RoadmapCard";
import SkeletonCard from "@/app/components/roadmap/SkeletonCard";

export default function PublicRoadmapsPage() {
  const { data, isLoading, error } = usePublicRoadmaps();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="p-4 text-center text-red-600">Error loading the roadmaps</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.map((roadmap) => (
        <RoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}