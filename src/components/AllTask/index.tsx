import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { fetchTodos } from "../../state/todoSlice";
import { RootState, AppDispatch } from "../../state/store";
import TaskList from "../TaskList";
import Loading from "../Loading";

const AllTask = () => {
  const { todos, isLoading } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const sortedTodos = [...todos].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <>
      {isLoading && <Loading />}
      <TaskList title={"Task List"} todos={sortedTodos} />
    </>
  );
};
export default AllTask;
