import { NextResponse } from "next/server";
import { forkRoadmap } from "@/lib/actions/roadmap";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export async function POST(
  request: Request,
  { params }: { params: { roadmapId: string } }
) {
  // Check if the user is authenticated
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const resolvedParams = await params;
  const { roadmapId } = resolvedParams;
  
  // Check if the roadmap exists and is public
  const original = await prisma.roadmap.findUnique({
    where: { id: roadmapId }
  });
  if (!original) {
    return NextResponse.json({ message: "Original roadmap not found" }, { status: 404 });
  }
  if (!original.isPublic) {
    return NextResponse.json({ message: "It's not possible to fork private roadmaps" }, { status: 403 });
  }
  
  try {
    const newRoadmap = await forkRoadmap(session.user.id, roadmapId);
    return NextResponse.json(newRoadmap, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
