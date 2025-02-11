import { Roadmap } from "@/types/roadmap";
import { useQuery } from "@tanstack/react-query";



const fetchPublicRoadmaps = async (): Promise<Roadmap[]> => {
  const res = await fetch('/api/roadmap/public');
  if (!res.ok) {
    throw new Error("Error fetching public roadmaps");
  }
  return res.json();
};

export function usePublicRoadmaps() {
  return useQuery({
    queryKey: ["public-roadmaps"],
    queryFn: fetchPublicRoadmaps,
    staleTime: 1000 * 60, // 1 minute
  });
}