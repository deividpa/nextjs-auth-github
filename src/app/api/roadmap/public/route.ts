import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');

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
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit, 10) : undefined,
    });
    
    return NextResponse.json(publicRoadmaps);
  } catch (error) {
    console.error("Error fetching public roadmaps:", error);
    return NextResponse.json({ message: "Error al obtener los roadmaps públicos" }, { status: 500 });
  }
}
