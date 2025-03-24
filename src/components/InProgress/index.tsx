import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import { Todo } from "../../types/todoTypes";
import TaskList from "../TaskList";
import Loading from "../Loading";

const InProgress = () => {
  const { todos, isLoading } = useSelector((state: RootState) => state.todo);
  const [inProgressTask, setInProgressTask] = useState<Todo[]>([]);

  useEffect(() => {
    let inProgressTask = todos.filter((todo) => !todo.isComplete);
    setInProgressTask(inProgressTask);
  }, [todos]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Always restore scroll when component unmounts
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loading />}
      <TaskList todos={inProgressTask} title={"In-progress Task"} />
    </>
  );
};

export default InProgress;
