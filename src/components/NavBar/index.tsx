import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { RootState, AppDispatch } from "../../state/store";
import useViewport from "../useViewport";

import { GiDwarfFace } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { TbProgressAlert } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { logOut } from "../../state/authSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface tablistType {
  name: string;
  icon: any;
  path: string;
}

const NavBar = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useViewport();

  const showMenuIcon = isMobile ? "block" : "hidden";

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleNavLink = () => {
    if (!isMobile) return;

    setNavOpen(false);
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

  useEffect(() => {
    setNavOpen((prev) => (!isMobile ? true : prev));
  }, [isMobile]);

  useEffect(() => {
    if (navOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen, isMobile]);

  return (
    <div
      className="navbar fixed w-full sm:w-[18vw] h-[10vh] sm:h-full flex sm:flex-col items-center
      justify-between px-5 sm:px-0 sm:pt-10 bg-primary-blue z-50"
    >
      <div className="sm:w-[90%] flex sm:flex-col items-center gap-5 sm:pb-8 text-white sm:border-b-2">
        <div className="w-fit rounded-full text-4xl sm:text-6xl border-2">
          <GiDwarfFace />
        </div>
        <span className="text-[1.1rem] sm:text-2xl">{userData?.username}</span>
      </div>
      <button
        onClick={() => setNavOpen(true)}
        className={`text-3xl text-white 
          ${showMenuIcon} ${navOpen ? "hidden" : "block"}`}
      >
        <RxHamburgerMenu />
      </button>
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={isMobile ? { right: "-100%", top: 0 } : {}}
            animate={isMobile ? { right: 0, left: 0 } : {}}
            exit={isMobile ? { right: "-100%" } : {}}
            transition={isMobile ? { ease: "easeOut", duration: 0.5 } : {}}
            className="absolute sm:static w-full h-screen sm:h-fit flex flex-col justify-center
             items-center sm:items-start text-custom-black-200 sm:text-white sm:mt-20 sm:pl-5 
             font-black bg-primary-blue"
          >
            <button onClick={() => setNavOpen(false)}>
              <IoClose
                className={`${showMenuIcon} absolute top-6 right-6 text-3xl ${
                  navOpen ? "block" : "hidden"
                }`}
              />
            </button>
            <ul className="sm:w-full flex flex-col gap-10">
              {tabList.map(({ name, icon, path }: tablistType, index) => (
                <NavLink
                  key={index}
                  to={path}
                  end={index === 0}
                  onClick={handleNavLink}
                  className={({ isActive }) =>
                    `w-fit sm:w-full flex gap-5 items-center py-3 pr-1 sm:p-2 sm:pr-0 
                   sm:rounded-l-2xl text-4xl transition-all duration-300 ${
                     isActive
                       ? "sm:bg-white text-white sm:text-primary-blue border-0"
                       : "sm:hover:bg-white sm:hover:text-primary-blue hover:text-white"
                   }`
                  }
                >
                  {icon}
                  <span className="text-xl sm:text-2xl">{name}</span>
                </NavLink>
              ))}
            </ul>
            <div className="mt-20">
              <button
                onClick={handleLogout}
                className="flex gap-5 text-xl items-center -ml-10 sm:-ml-0 sm:text-2xl cursor-pointer
                transition-transform duration-200 ease-in-out hover:scale-90 hover:text-white"
              >
                <SlLogout className="text-4xl" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="hidden sm:block ml-5 mb-3 text-[1rem] text-white mt-auto self-start">
        &copy; 2025 Kvro TodoList
      </span>
    </div>
  );
};

export default NavBar;
