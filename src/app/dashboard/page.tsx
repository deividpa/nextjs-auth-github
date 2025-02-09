import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import RoadmapCard from '@/app/components/roadmap/RoadmapCard';
import CreateRoadmapForm from '../components/roadmap/CreateRoadmapForm';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/');
  }
  
  // Find all roadmaps for the user
  const roadmaps = await prisma.roadmap.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Mi Dashboard</h1>
      
      {/* Form to create new roadmaps  */}
      <CreateRoadmapForm />

      {/* Roadmap List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {roadmaps.map(roadmap => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}