import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// modules
import Loader from "../modules/Loader";

// services
import { getUser } from "../services/user";

// background image
import bgImg from "../assets/air-top.png";
// logo
import logo from "../assets/farabar-logo.png";

// utils
import { setCookie } from "../utilities/cookie";

function LoginPage() {
  const navigate = useNavigate();

  // POST
  const { mutate: getUserMutate, isPending: getUserPending } = useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      if (data.data?.status === "Success") {
        console.log(data)
        setCookie(data.data?.token)
        toast.success("خوش آمدید.");
        navigate("/");
      } else {
        toast.error("کاربر یافت نشد!");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // uw -> username warning
  const [uW, setUW] = useState(false);
  // pw -> password warning
  const [pW, setPW] = useState(false);

  const usernameInpuRef = useRef(null);
  const passInputRef = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (username && password) {
      getUserMutate({ number: username, password });
    } else {
      if (username === "") {
        setUW(true);
        usernameInpuRef.current.focus();
        if (password === "") {
          setPW(true);
        } else {
          setPW(false);
        }
      } else {
        setUW(false);
        if (password === "") {
          passInputRef.current.focus();
          setPW(true);
        } else {
          setPW(false);
        }
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="space-y-4">
        <div className="relative bg-[#ffffff73] p-4">
          <h2 className="text-center font-bold text-lg">
            شرکت حمل و نقل هواپیمایی فرابار پرواز
          </h2>
          <img
            className="absolute top-0 left-0 w-16 h-16"
            src={logo}
            alt="logo"
          />
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col border-2 bg-[#ffffff73] border-primary rounded-lg p-4 min-w-[500px]"
        >
          <p className="font-bold text-lg">ورود به حساب کاربری</p>
          <span className="text-sm mt-2">
            برای استفاده از امکانات سامانه، لطفا نام کاربری و رمز عبور خود را
            وارد کنید.
          </span>
          <label className="mt-4" htmlFor="username">
            نام کاربری
          </label>
          <input
            ref={usernameInpuRef}
            className={`mt-1 bg-[#ffffffaf] outline-none text-sm p-2 border ${
              uW && !username ? "border-red-500" : "border-primary"
            } rounded-lg`}
            type="text"
            id="username"
            placeholder="نام کاربری خود را وارد نمایید"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="mt-4" htmlFor="password">
            رمز عبور
          </label>
          <input
            ref={passInputRef}
            className={`mt-1 bg-[#ffffffaf] outline-none text-sm p-2 border ${
              pW && !password ? "border-red-500" : "border-primary"
            } rounded-lg`}
            type="password"
            id="password"
            placeholder="رمز عبور خود را وارد نمایید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`mt-8 text-white font-bold bg-primary rounded-lg p-2 flex items-center justify-center gap-4 ${
              getUserPending ? "opacity-50" : null
            }`}
            disabled={getUserPending}
          >
            ورود
            {getUserPending && <Loader />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
