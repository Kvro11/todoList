import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { RootState } from "../../state/store";
import { Todo } from "../../types/todoTypes";
import TaskList from "../TaskList";

const Completed = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  const [completedTask, setCompletedTask] = useState<Todo[]>([]);
  const { setTaskToEdit, setAddTask } = useOutletContext<any>();

  useEffect(() => {
    const tasks = todos.filter((todo) => todo.isComplete);
    setCompletedTask(tasks);
  }, [todos]);
  return (
    <TaskList
      title={"Completed Task"}
      todos={completedTask}
      setAddTask={setAddTask}
      setTaskToEdit={setTaskToEdit}
    />
  );
};

export default Completed;
