import { NextResponse } from "next/server";

let tasks = [
  { _id: "1", title: "Task 1", completed: false },
  { _id: "2", title: "Task 2", completed: false },
];

// ✅ GET: Fetch all tasks
export async function GET() {
  return NextResponse.json(tasks, { status: 200 });
}

// ✅ POST: Add a new task
export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const newTask = { _id: `${Date.now()}`, title, completed: false };
    tasks.push(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding task" }, { status: 500 });
  }
}

// ✅ PUT: Update task completion
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    const task = tasks.find((task) => task._id === id);
    if (!task)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });

    task.completed = !task.completed;
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove a task
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    tasks = tasks.filter((task) => task._id !== id);
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting task" },
      { status: 500 }
    );
  }
}
