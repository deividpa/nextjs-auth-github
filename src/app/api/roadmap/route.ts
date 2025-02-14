import { NextResponse } from 'next/server';
import { createRoadmap } from '@/lib/actions/roadmap';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const { title, isPublic } = await request.json();
  
  try {
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
    }
    const roadmap = await createRoadmap(userId, title, isPublic);
    return NextResponse.json(roadmap);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
  }
}