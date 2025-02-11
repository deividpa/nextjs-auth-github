import { prisma } from "@/prisma/prisma";
import { GeminiService } from '@/lib/services/ai/gemini.service';

export async function createRoadmap(userId: string, title: string, isPublic = false) {

  const geminiService = new GeminiService();

  // Check if the user has reached the maximum number of roadmaps (3)
  const count = await prisma.roadmap.count({ where: { userId } });
  if (count >= 3) {
    throw new Error('You have reached the maximum number of roadmaps.');
  }

  // Call the Gemini AI service to generate a roadmap
  const { description, items } = await geminiService.generateRoadmap(title);

  // Create the roadmap in the database and its items
  const roadmap = await prisma.roadmap.create({
    data: {
      title,
      description,
      isPublic,
      user: { connect: { id: userId } },
      items: {
        create: items.map((item, index) => ({
          content: item,
          order: index + 1,
        })),
      },
    },
    include: { items: true },
  });

  return roadmap;
}

export async function forkRoadmap(userId: string, originalRoadmapId: string) {
  // Get the original roadmap with its items to fork
  const original = await prisma.roadmap.findUnique({
    where: { id: originalRoadmapId },
    include: { items: true },
  });
  if (!original) {
    throw new Error("Original roadmap not found");
  }
  
  if (!original.isPublic) {
    throw new Error("It is not possible to fork a private roadmap");
  }
  
  // Create the new roadmap with the same title, description, and items
  const newRoadmap = await prisma.roadmap.create({
    data: {
      title: original.title,
      description: original.description,
      isPublic: false,
      user: { connect: { id: userId } },
      forkedFrom: { connect: { id: original.id } },
      items: {
        create: original.items.map((item) => ({
          content: item.content,
          order: item.order,
          status: item.status,
        })),
      },
    },
    include: { items: true },
  });
  return newRoadmap;
}
