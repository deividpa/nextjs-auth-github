"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md shadow">
      <h2 className="text-xl font-semibold mb-2">Crear Nuevo Roadmap</h2>
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
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Creando..." : "Crear Roadmap"}
      </button>
    </form>
  );
}