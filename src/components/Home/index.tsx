import { Outlet } from "react-router-dom";

import NavBar from "../NavBar";

const Home = ({ setAddTask, setTaskToEdit }: any) => {
  return (
    <div className="w-full relative flex">
      <div className="w-full sm:w-[18vw]"></div>
      <NavBar />
      <main className="flex-1 p-6">
        <Outlet context={{ setTaskToEdit, setAddTask }} />
      </main>
    </div>
  );
};

export default Home;
