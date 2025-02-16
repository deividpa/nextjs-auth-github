import { Roadmap } from "@/types/roadmap";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches public roadmaps from the API.
 *
 * @param {number} [limit] - The maximum number of roadmaps to return. If provided, limits the number of roadmaps fetched.
 * @returns {Promise<Roadmap[]>} A promise that resolves to an array of public roadmaps.
 */
const fetchPublicRoadmaps = async (limit?: number): Promise<Roadmap[]> => {
  const url = `/api/roadmap/public${limit ? `?limit=${limit}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error fetching public roadmaps");
  }
  return res.json();
};

export function usePublicRoadmaps(limit?: number) {
  return useQuery({
    queryKey: ["public-roadmaps", limit],
    queryFn: () => fetchPublicRoadmaps(limit),
    staleTime: 1000 * 60, // 1 minute
  });
}