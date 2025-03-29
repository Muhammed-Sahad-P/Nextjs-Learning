import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasks() {
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/tasks");
      return res.data;
    },
  });

  // Add task
  const addTaskMutation = useMutation({
    mutationFn: async (title: string) => {
      return await axios.post("/api/tasks", { title });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Toggle completion
  const toggleTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.put("/api/tasks", { id });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Delete task
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete("/api/tasks", { data: { id } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks,
    isLoading,
    error,
    addTaskMutation,
    toggleTaskMutation,
    deleteTaskMutation,
  };
}
