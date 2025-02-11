import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function GET() {
  try {
    const publicRoadmaps = await prisma.roadmap.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        forkedFromId: true,
        user: {
          select: {
            name: true,
            email: true
          }
        },
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(publicRoadmaps);
  } catch (error) {
    console.error("Error fetching public roadmaps:", error);
    return NextResponse.json({ message: "Error al obtener los roadmaps públicos" }, { status: 500 });
  }
}
