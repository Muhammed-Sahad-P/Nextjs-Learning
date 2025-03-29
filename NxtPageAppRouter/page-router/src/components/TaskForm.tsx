import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NewTask {
    title: string;
}

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation<
        AxiosResponse<any>,
        Error,
        NewTask
    >({
        mutationFn: async (newTask: NewTask) => axios.post("/api/tasks", newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setTitle("");
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === "") return;
        mutation.mutate({ title });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task..."
                className="border p-2 rounded w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
        </form>
    );
}
