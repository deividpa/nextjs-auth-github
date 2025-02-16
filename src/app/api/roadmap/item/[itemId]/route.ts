import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";
import { RoadmapItemStatusSchema } from "@/lib/services/ai/schemas/roadmapItemStatus.schema";

export async function PATCH(request: NextRequest) {
  try {
    // Check if the user is authenticated
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract itemId from the URL
    const url = new URL(request.url);
    const itemId = url.pathname.split('/').pop();

    if (!itemId) {
      return NextResponse.json({ message: "Item ID is required" }, { status: 400 });
    }

    const { status } = await request.json();

    // Check if the status is a valid RoadmapItemStatus
    const parseResult = RoadmapItemStatusSchema.safeParse(status);
    if (!parseResult.success) {
      return NextResponse.json({ message: "Invalid State" }, { status: 400 });
    }

    // Find the item by its ID
    const item = await prisma.roadmapItem.findUnique({
      where: { id: itemId },
      include: { roadmap: true },
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    if (item.roadmap.userId !== session.user.id) {
      return NextResponse.json(
        { message: "You are not allowed to change this roadmap item" },
        { status: 403 }
      );
    }

    // Update the status of the item
    const updatedItem = await prisma.roadmapItem.update({
      where: { id: itemId },
      data: { status },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Error en PATCH /api/roadmap/item/:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}