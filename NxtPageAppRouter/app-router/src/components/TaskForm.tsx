"use client";

import { useTasks } from "@/app/hooks/useTask";
import { useState } from "react";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const { addTaskMutation } = useTasks();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTaskMutation.mutate(title);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Task"
                className="border p-2 flex-1 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
            </button>
        </form>
    );
}
