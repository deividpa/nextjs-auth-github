"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export default function CreateRoadmapForm() {
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
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
        body: JSON.stringify({ title, isPublic: !isPrivate })
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      router.refresh();
      setTitle("");
      setIsPrivate(false);
    } catch (error) {
      console.error("Error creating roadmap:", error);
      alert("There was an error creating the roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border-2 border-secondary">
      <h2 className="text-primary text-xl font-semibold mb-2">Create new Roadmap</h2>
      <div className="mb-4">
        <input
          type="text"
          id="title"
          className="w-full border border-secondary p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of the roadmap: e.g. Skin Care Routine, Math Study Plan, etc."
          required
        />
      </div>
      <div className="mb-2 flex items-center">
        <input
          type="checkbox"
          id="isPrivate"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isPrivate">Make it Private!</label>
      </div>
      <Button
        type="submit"
        loading={loading}
        variant="outline"
        className="mt-2"
      >
        Create Roadmap
      </Button>
    </form>
  );
}