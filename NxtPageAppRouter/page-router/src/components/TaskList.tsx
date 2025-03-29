import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

interface TaskProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskProps) {
    const queryClient = useQueryClient();

    const toggleMutation = useMutation<
        AxiosResponse<any>,
        Error,
        { id: string; completed: boolean }
    >({
        mutationFn: async ({ id, completed }) => {
            return await axios.put("/api/tasks", { id, completed });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        onError: (error) => {
            console.error("Error updating task:", error);
        },
    });



    const deleteMutation = useMutation<
        AxiosResponse<any>,
        Error,
        string
    >({
        mutationFn: async (id) => {
            return await axios.delete("/api/tasks", { data: { id } });
        },
        onMutate: async (id): Promise<{ previousTasks: Task[] | undefined }> => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

            if (previousTasks) {
                queryClient.setQueryData(
                    ["tasks"],
                    previousTasks.filter((task) => task._id !== id)
                );
            }

            return { previousTasks };
        },
    });



    return (
        <ul className="space-y-2">
            {tasks?.map((task) => (
                <li key={task._id} className="flex justify-between items-center p-2 border rounded">
                    <div className="flex items-center gap-2">
                        <span

                            className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                        >
                            {task.title}
                        </span>
                        <button className="text-blue-500 cursor-pointer" onClick={() => toggleMutation.mutate({ id: task._id, completed: !task.completed })}>Edit</button>
                    </div>
                    <button
                        onClick={() => deleteMutation.mutate(task._id)}
                        className="text-red-500"
                    >
                        X
                    </button>
                </li>
            ))}
        </ul>
    );
}