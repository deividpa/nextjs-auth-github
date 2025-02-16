import { prisma } from '@/prisma/prisma';
import { auth } from '@/auth';
import RoadmapDetail from '@/app/components/roadmap/RoadmapDetail';

interface PageProps {
  params: Promise<{ roadmapId: string }>;
}

export default async function RoadmapPage({ params }: PageProps) {
  const { roadmapId } = await params;

  if (!roadmapId) {
    return <p className="p-6 text-center">Invalid roadmap ID</p>;
  }

  const session = await auth();

  const roadmap = await prisma.roadmap.findUnique({
    where: { id: roadmapId },
    include: { items: true },
  });

  if (!roadmap) {
    return <p className="p-6 text-center">Roadmap not found</p>;
  }

  // If the roadmap is private and the user is not the owner, show a message
  if (!roadmap.isPublic && roadmap.userId !== session?.user?.id) {
    return <p className="p-6 text-center">You do not have permission to view this roadmap.</p>;
  }

  const isOwner = roadmap.userId === session?.user?.id;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <RoadmapDetail roadmap={roadmap} isOwner={isOwner} />
    </div>
  );
}