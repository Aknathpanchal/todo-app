"use client";

import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { ITask } from "@/types/tasks";
import { observer } from "mobx-react-lite";
import { useStore } from "./store";

export default observer(function Home(){
  const {
    rootStore: { tasksDetails },
  } = useStore();

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    tasksDetails.fetchTasksDetails().then(() => {
      const userDetails = tasksDetails.getTasksDetails;
      setTasks(userDetails);
    });
  }, [tasksDetails]);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task Management Application</h1>
        <AddTask setTasks={setTasks} />
      </div>
      <TodoList tasks={tasks} setTasks={setTasks} />
    </main>
  );
});