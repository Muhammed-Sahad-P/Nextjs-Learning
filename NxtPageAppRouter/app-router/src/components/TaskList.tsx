"use client";

import { useTasks } from "@/app/hooks/useTask";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

export default function TaskList() {
    const { tasks, isLoading, error, toggleTaskMutation, deleteTaskMutation } = useTasks();

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks.</p>;

    return (
        <ul className="space-y-2">
            {tasks?.map((task: Task) => (
                <li key={task._id} className="flex justify-between items-center p-2 border rounded">
                    <span
                        onClick={() => toggleTaskMutation.mutate(task._id)}
                        className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                    >
                        {task.title}
                    </span>
                    <div className="flex space-x-2">
                        <button className="text-gray-500">
                            <FiEdit />
                        </button>
                        <button onClick={() => deleteTaskMutation.mutate(task._id)} className="text-red-500">
                            <FiTrash />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
