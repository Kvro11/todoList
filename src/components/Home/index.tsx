import { Outlet } from "react-router-dom";

import NavBar from "../NavBar";

const Home = ({ setAddTask, setTaskToEdit }: any) => {
  return (
    <div className="w-full min-h-dvh relative flex">
      <div className="w-[38%] sm:w-[18vw]"></div>
      <NavBar />
      <main className="flex-1 p-2 sm:p-6">
        <Outlet context={{ setTaskToEdit, setAddTask }} />
      </main>
    </div>
  );
};

export default Home;
