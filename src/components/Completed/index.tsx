import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import { Todo } from "../../types/todoTypes";
import TaskList from "../TaskList";
import Loading from "../Loading";

const Completed = () => {
  const { todos, isLoading } = useSelector((state: RootState) => state.todo);
  const [completedTask, setCompletedTask] = useState<Todo[]>([]);

  useEffect(() => {
    const tasks = todos.filter((todo) => todo.isComplete);
    setCompletedTask(tasks);
  }, [todos]);
  return (
    <>
      {isLoading && <Loading />}
      <TaskList title={"Completed Task"} todos={completedTask} />
    </>
  );
};

export default Completed;
