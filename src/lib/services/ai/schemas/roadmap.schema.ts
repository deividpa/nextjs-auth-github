import { z } from "zod";

// validate the structure of the response
export const RoadmapSchema = z.object({
  description: z.string().optional(),
  items: z.array(z.string()).min(10) // at least 10 steps
});

export type RoadmapResponse = z.infer<typeof RoadmapSchema>;