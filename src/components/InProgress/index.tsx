import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { RootState } from "../../state/store";
import { Todo } from "../../types/todoTypes";
import TaskList from "../TaskList";

const InProgress = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  const [inProgressTask, setInProgressTask] = useState<Todo[]>([]);

  const { setTaskToEdit, setAddTask } = useOutletContext<any>();

  useEffect(() => {
    let inProgressTask = todos.filter((todo) => !todo.isComplete);
    setInProgressTask(inProgressTask);
  }, [todos]);

  console.log({ inProgressTask });

  return (
    <TaskList
      todos={inProgressTask}
      setAddTask={setAddTask}
      setTaskToEdit={setTaskToEdit}
      title={"In-progress Task"}
    />
  );
};

export default InProgress;
