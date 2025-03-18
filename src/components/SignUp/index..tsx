import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { signUp } from "../../state/authSlice";

import { RxRocket } from "react-icons/rx";
import signUpSvg from "../../assets/Auth/singUp.svg";
import { RootState, AppDispatch } from "../../state/store";
import Loading from "../Loading";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { error, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const inputStyle =
    "border border-custom-gray rounded-lg px-3 py-2 sm:py-3 text-[1rem] sm:text-[1.2rem]";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(signUp({ email, password, username }));

    if (signUp.fulfilled.match(resultAction)) {
      navigate("/home"); // Ensure navigation happens after successful sign-in
    }
  };

  const goToSignIn = () => {
    navigate("/signIn");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center" });
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loading />}
      <div
        className="w-screen h-screen flex flex-col sm:flex-row justify-center items-center
      bg-custom-gray"
      >
        <ToastContainer />
        <div className="w-[80%] min-[500px]:w-[70%] sm:w-[27%] h-fit order-2 sm:order-1">
          <form
            onSubmit={handleSignUp}
            className="h-full flex flex-col gap-5 p-5 sm:p-8 bg-white 
          shadow-custom-shadow rounded-2xl"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <RxRocket className="hidden sm:block text-5xl text-linear-blue-200" />
              <h2 className="text-2xl sm:text-3xl font-black">Sign Up</h2>
              <p className="text-[1rem] sm:text-xl">
                Create an account to wsrite your tasks anytime and anywhere!
              </p>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputStyle}
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className={inputStyle}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-linear-blue-100 to-linear-blue-200 py-2 
             sm:py-3 rounded-lg text-white text-[1rem] sm:text-xl font-semibold transition
             ease-in-out duration-200 hover:scale-95"
            >
              Sign Up
            </button>
            <span className="text-center">
              Already have an account?{" "}
              <button
                onClick={goToSignIn}
                className="text-linear-blue-200 transition ease-in-out hover:scale-90"
              >
                Sign In
              </button>
            </span>
          </form>
        </div>
        <div
          className="w-[80%] sm:w-[27%] h-fit sm:h-[79%] order-1 sm:order-2 rounded-br-2xl rounded-tr-2xl
        bg-gradient-to-b from-linear-blue-100 to-linear-blue-200 sm:flex justify-center items-center hidden"
        >
          <img src={signUpSvg} className="sm:w-[90%] mr-5" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
