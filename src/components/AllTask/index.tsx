import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { fetchTodos } from "../../state/todoSlice";
import { RootState, AppDispatch } from "../../state/store";
import TaskList from "../TaskList";

const AllTask = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { setTaskToEdit, setAddTask } = useOutletContext<any>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (!userData?.id) {
      navigate("/signIn");
    } else {
      navigate("/home");
    }
  }, [userData]);

  return (
    <TaskList
      title={"Task List"}
      todos={todos}
      setAddTask={setAddTask}
      setTaskToEdit={setTaskToEdit}
    />
  );
};
export default AllTask;
