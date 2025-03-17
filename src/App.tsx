import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./state/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AllTask from "./components/AllTask";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
import NewTaskModal from "./components/NewTaskModal";
import SignUp from "./components/SignUp/index.";
import SignIn from "./components/SignIn";
import { setUser } from "./state/authSlice";

const App = () => {
  const [addTask, setAddTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      dispatch(setUser(JSON.parse(storedData))); //Update Redux only if needed
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="relative w-full min-h-screen bg-[#f5f5f5] flex flex-col sm:flex-row ">
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <Home setAddTask={setAddTask} setTaskToEdit={setTaskToEdit} />
            }
          >
            <Route index element={<AllTask />} />
            <Route path="inProgress" element={<InProgress />} />
            <Route path="completed" element={<Completed />} />
          </Route>
        </Routes>

        {addTask && (
          <div
            className="absolute top-0 bottom-0 left-0 right-0
          inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
          >
            <NewTaskModal
              setAddTask={setAddTask}
              taskToEdit={taskToEdit}
              setTaskToEdit={setTaskToEdit}
            />
          </div>
        )}
      </div>
    </Router>
  );
};
export default App;
