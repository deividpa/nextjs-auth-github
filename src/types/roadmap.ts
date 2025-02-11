export type RoadmapItemStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';

export interface Roadmap {
  id: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  userId: string;
  forkedFromId: string | null;
  createdAt: Date;
  updatedAt: Date;
  items?: RoadmapItem[];
}

export interface RoadmapItem {
  id: string;
  content: string;
  status: RoadmapItemStatus;
  order: number;
  roadmapId: string;
  createdAt: Date;
  updatedAt: Date;
}
