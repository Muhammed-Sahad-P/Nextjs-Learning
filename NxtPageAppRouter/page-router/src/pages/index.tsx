import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const fetchTasks = async () => {
  const { data } = await axios.get('/api/tasks');
  return data;
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await axios.get("/api/tasks"); // Fetch from API
//     return { props: { initialTasks: res.data } };
//   } catch (error) {
//     return { props: { initialTasks: [] } };
//   }
// };

export default function Home() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
      <TaskForm />
      {isLoading ? <p>Loading...</p> : <TaskList tasks={tasks} />}
    </div>
  );
}