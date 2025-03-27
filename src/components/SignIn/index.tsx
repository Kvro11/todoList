import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppDispatch, RootState } from "../../state/store";
import { signIn, socialSignIn } from "../../state/authSlice";
import { SocialSignType } from "../../types/authTypes";

import { RxRocket } from "react-icons/rx";
import signInSvg from "../../assets/Auth/signIn.svg";
import googleIcon from "../../assets/Auth/googleIcon.svg";
// import facebookIcon from "../../assets/Auth/facebookIcon.svg";
// import twitterIcon from "../../assets/Auth/twitterIcon.svg";
import Loading from "../Loading";

enum ProviderType {
  Google = "google",
  Facebook = "facebook",
  Twitter = "twitter",
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const inputStyle =
    "border border-custom-gray rounded-lg px-3 py-2 sm:py-3 text-[1rem] sm:text-[1.2rem]";

  const socialBtn = [
    {
      id: ProviderType.Google,
      name: "Google icon",
      img: googleIcon,
      title: "Google Sign-in",
    },
    // {
    //   id: ProviderType.Facebook,
    //   name: "Facebook icon",
    //   img: facebookIcon,
    // },
    // {
    //   id: ProviderType.Twitter,
    //   name: "Twitter icon",
    //   img: twitterIcon,
    // },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(signIn({ email, password }));
    if (signIn.fulfilled.match(resultAction)) {
      navigate("/home"); // Ensure navigation happens after successful sign-in
    }
  };

  const handleSocialSignIn = async ({ providerType }: SocialSignType) => {
    const resultAction = await dispatch(socialSignIn({ providerType }));

    if (socialSignIn.fulfilled.match(resultAction)) {
      navigate("/home"); // Ensure navigation happens after successful sign-in
    }
  };

  const goToSignUp = () => {
    navigate("/signUp");
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
        <div
          className="w-[80%] sm:w-[27%] h-fit sm:h-[77%] rounded-bl-2xl rounded-tl-2xl
        bg-gradient-to-b from-linear-blue-100 to-linear-blue-200 sm:flex justify-center items-center hidden"
        >
          <img
            src={signInSvg}
            alt="Sign-in Icon"
            className="sm:w-[90%] mr-5"
            loading="lazy"
            width="90%"
            height="auto"
          />
        </div>

        <div className="w-[80%] min-[500px]:w-[70%] sm:w-[27%] h-fit order-2 sm:order-1">
          <form
            onSubmit={handleSignIn}
            className="h-full flex flex-col gap-5 p-5 sm:p-8 bg-white 
          shadow-custom-shadow rounded-2xl"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <RxRocket className="hidden sm:block text-5xl text-linear-blue-200" />
              <h2 className="text-2xl sm:text-3xl font-black">Sign In</h2>
              <p className="text-[1rem] sm:text-xl">
                Create an account to write your tasks anytime and anywhere!
              </p>
            </div>
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
            <div className="mt-2">
              <div className="flex items-center justify-center gap-5">
                <hr className="w-[20%]" />
                <span className="text-[1rem] sm:text-xl">or sign in with</span>
                <hr className="w-[20%]" />
              </div>
              <div className="mt-7 mb-3 flex justify-center items-center gap-10">
                {socialBtn.map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => handleSocialSignIn({ providerType: btn.id })}
                    className="flex items-center gap-3 border-2 py-1 px-4 rounded-full
                    transition-transform ease-in-out delay-100 hover:scale-90"
                  >
                    <img
                      src={btn.img}
                      alt={btn.name}
                      width="auto"
                      height="auto"
                    />
                    <span>{btn.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-linear-blue-100 to-linear-blue-200 py-2 
             sm:py-3 rounded-lg text-white text-[1rem] sm:text-xl font-semibold transition
             ease-in-out duration-200 hover:scale-95"
            >
              Sign In
            </button>
            <span className="text-center">
              Doesn't have an account?{" "}
              <button
                type="submit"
                onClick={goToSignUp}
                className="text-linear-blue-200"
              >
                Sign Up
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
