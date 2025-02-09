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
