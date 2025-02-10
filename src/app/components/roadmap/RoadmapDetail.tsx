"use client";

import { useState } from "react";
import { Roadmap, RoadmapItem } from "@/types/roadmap";
import router from "next/router";

interface RoadmapDetailProps {
  roadmap: Roadmap & { items: RoadmapItem[] };
  isOwner: boolean;
}

export default function RoadmapDetail({ roadmap, isOwner }: RoadmapDetailProps) {
  console.log(roadmap);
  // Store the items in a local state to update the status of each item
  const [items, setItems] = useState(roadmap.items);
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    setLoadingItem(itemId);

    try {
      const res = await fetch(`/api/roadmap/item/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }
      const updatedItem = await res.json();

      // Update the status of the item in the local state
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, status: updatedItem.status } : item))
      );
    } catch (error) {
      console.error("Error updating the state of the item:", error);
      alert("Error updating the state");
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{roadmap.title}</h1>
      {roadmap.description && <p className="text-xl text-purple-700 mb-8">{roadmap.description}</p>}

      <div className="space-y-6">
        {items
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-l-8 border-purple-400"
            >
              <div className="p-6">
                <div className="w-full">
                  <h3 className="font-normal text-lg mb-2">{item.content}</h3>
                </div>
                {isOwner && (
                  <div className="mt-2">
                    {loadingItem === item.id ? (
                      <div className="h-10 w-36 bg-gray-300 rounded-md animate-bounce"></div>
                    ) : (
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="border rounded-md p-2 bg-purple-200 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={loadingItem === item.id}
                      >
                        <option value="NOT_STARTED">No iniciado</option>
                        <option value="IN_PROGRESS">En progreso</option>
                        <option value="DONE">Completado</option>
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* If the roadmap is public and the user is NOT the owner, we display a button to fork it */}
      {!isOwner && roadmap.isPublic && (
        <div className="mt-12 text-center">
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
            onClick={async () => {
              try {
                const res = await fetch(`/api/roadmap/fork/${roadmap.id}`, {
                  method: "POST"
                });
                if (res.ok) {
                  const forkedRoadmap = await res.json();

                  router.push(`/roadmap/${forkedRoadmap.id}`);
                  alert("Fork realizado correctamente!");
                } else {
                  const errorData = await res.json();
                  alert(errorData.message);
                }
              } catch (error) {
                console.error("Error al hacer fork:", error);
                alert("Error al hacer fork");
              }
            }}
          >
            Hacer fork a este roadmap
          </button>
        </div>
      )}
    </div>
  );
}
