import { useState } from "react";

import { CgProfile } from "react-icons/cg";
import { GiDwarfFace } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  const [isLogin, setIslogin] = useState(true);
  return (
    <div
      className="w-full sm:w-[6vw] bg-amber-100 flex flex-row sm:flex-col
      items-center gap-5 px-5 pt-5 sm:pt-10"
    >
      {isLogin ? (
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl border-2 p-1 rounded-full">
            <GiDwarfFace />
          </span>
          {/* <span className="text-2xl">Kvro</span> */}
        </div>
      ) : (
        <div className="flex items-center gap-3 border-b-2 border-amber-700">
          <CgProfile className="text-[1.7rem]" />
          <div>
            <button>LogIn</button> / <button>Sign-up</button>
          </div>
        </div>
      )}
      <div className="h-0.5 w-full bg-amber-700 "></div>
      <ul className="flex flex-col gap-10 text-3xl mt-10">
        <li>
          <IoHomeOutline />
        </li>
        {/* <li>
          <GrCompliance />
        </li>
        <li>
          <MdOutlineDeleteSweep />
        </li> */}
      </ul>
    </div>
  );
};

export default Header;
