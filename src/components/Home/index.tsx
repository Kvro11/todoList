import { Outlet } from "react-router-dom";

import NavBar from "../NavBar";

const Home = () => {
  return (
    <div className="w-full min-h-dvh relative flex flex-col sm:flex-row">
      <div className="w-full h-[10vh] sm:h-full sm:w-[18vw]"></div>
      <NavBar />
      <main className="flex-1 p-2 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
