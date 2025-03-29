import { NextApiRequest, NextApiResponse } from "next";

let tasks: { _id: string; title: string; completed: boolean }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = { _id: Date.now().toString(), title, completed: false };
    tasks.push(newTask);
    return res.status(201).json(newTask);
  }

  if (req.method === "PUT") {
    const { id, completed } = req.body;
    const task = tasks.find((t) => t._id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = completed;
    return res.status(200).json({ message: "Task updated" });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    tasks = tasks.filter((t) => t._id !== id);
    return res.status(200).json({ message: "Task deleted" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
