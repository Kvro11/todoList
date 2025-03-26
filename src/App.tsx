import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import AllTask from "./components/AllTask";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
import NewTaskModal from "./components/NewTaskModal";
import SignUp from "./components/SignUp/index.";
import SignIn from "./components/SignIn";
import { setUser } from "./state/authSlice";
import { AnimatePresence, motion } from "framer-motion";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { addTask } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      dispatch(setUser(JSON.parse(storedData))); //Update Redux only if needed
    }
  }, [dispatch]);

  useEffect(() => {
    if (addTask) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Always restore scroll when component unmounts
    };
  }, [addTask]);

  return (
    <Router>
      <div className="relative w-full">
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/home"
            element={userData ? <Home /> : <Navigate to="/signIn" />}
          >
            <Route index element={<AllTask />} />
            <Route path="inProgress" element={<InProgress />} />
            <Route path="completed" element={<Completed />} />
          </Route>
        </Routes>

        <AnimatePresence mode="wait">
          {addTask && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              className="absolute top-0 bottom-0 left-0 right-0 z-50
              inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
            >
              <NewTaskModal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};
export default App;
