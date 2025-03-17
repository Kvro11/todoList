import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootState, AppDispatch } from "../../state/store";

import { CgProfile } from "react-icons/cg";
import { GiDwarfFace } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { TbProgressAlert } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { logOut } from "../../state/authSlice";

const NavBar = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const tabList = [
    {
      name: "All Task",
      icon: <CiViewList />,
      path: "/home",
    },
    {
      name: "In-progress",
      icon: <TbProgressAlert />,
      path: "/home/inProgress",
    },
    {
      name: "Completed",
      icon: <GoChecklist />,
      path: "/home/completed",
    },
  ];

  return (
    <div
      className="fixed top-0 left-0 bottom-0 w-full sm:w-[18vw] bg-primary-blue flex 
      flex-row sm:flex-col gap-5 pl-5 pt-5 sm:pt-10 text-white"
    >
      <div className="pr-5">
        {userData ? (
          <div className="flex flex-col items-center gap-3 ">
            <span className="text-4xl border-2 p-1 rounded-full">
              <GiDwarfFace />
            </span>
            <span className="text-2xl">{userData?.username}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 border-b-2 border-amber-700">
            <CgProfile className="text-[1.7rem]" />
            <div>
              <button>LogIn</button> / <button>Sign-up</button>
            </div>
          </div>
        )}
        <div className="h-0.5 w-full bg-white mt-5"></div>
      </div>
      <ul className="flex flex-col gap-14 text-4xl mt-10 h-[50%]">
        {tabList.map((tab, index) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={index === 0}
            className={({ isActive }) =>
              `flex gap-4 items-center p-2 pr-0 font-black rounded-l-2xl transition-all duration-300 ${
                isActive
                  ? "bg-white text-primary-blue"
                  : "hover:bg-white hover:text-primary-blue text-white"
              }`
            }
          >
            {tab.icon}
            <span className="text-2xl">{tab.name}</span>
          </NavLink>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 font-black text-2xl"
      >
        <SlLogout className="text-3xl" /> Logout
      </button>
      <span className="fixed bottom-3">&copy; 2025 Kvro TodoList</span>
    </div>
  );
};

export default NavBar;
