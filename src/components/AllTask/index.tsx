import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { fetchTodos } from "../../state/todoSlice";
import { RootState, AppDispatch } from "../../state/store";
import TaskList from "../TaskList";
import Loading from "../Loading";

const AllTask = () => {
  const { todos, isLoading } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const { setTaskToEdit, setAddTask } = useOutletContext<any>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      <TaskList
        title={"Task List"}
        todos={todos}
        setAddTask={setAddTask}
        setTaskToEdit={setTaskToEdit}
      />
    </>
  );
};
export default AllTask;
