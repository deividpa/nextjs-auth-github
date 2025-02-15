"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export default function CreateRoadmapForm() {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, isPublic })
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      router.refresh();
      setTitle("");
      setIsPublic(false);
    } catch (error) {
      console.error("Error creating roadmap:", error);
      alert("Ocurrió un error al crear el roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border-2 border-slate-400">
      <h2 className="text-primary text-xl font-semibold mb-2">Crear Nuevo Roadmap</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1" htmlFor="title">
          Título:
        </label>
        <input
          type="text"
          id="title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isPublic">Hacer público</label>
      </div>
      <Button
        type="submit"
        loading={loading}
        variant="outline"
        className="mt-4"
      >
        Crear Roadmap
      </Button>
    </form>
  );
}