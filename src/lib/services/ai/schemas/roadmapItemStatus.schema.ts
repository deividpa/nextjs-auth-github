import { z } from "zod";

export const RoadmapItemStatusSchema = z.enum(["NOT_STARTED", "IN_PROGRESS", "DONE"]);
export type RoadmapItemStatus = z.infer<typeof RoadmapItemStatusSchema>;