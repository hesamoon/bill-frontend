import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// icons
import profileIcon from "../assets/profile.svg";
// logo
import logo from "../assets/farabar-logo.png";

// utils
import { clearCookie } from "../utilities/cookie";

function Header() {
  const navigate = useNavigate();
  // // POST
  // const { mutate: logoutUserMutate, isPending } = useMutation({
  //   mutationFn: logoutUser,
  //   onSuccess: (data) => {
  //     toast.success("خارج شدید.");
  //     navigate("/login");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const logoutUser = () => {
    clearCookie();
    toast.success("خارج شدید.");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-50 p-4 border-b border-outline">
      <div
        className="border-2 border-black rounded-full p-2 w-10 h-10 flex items-center justify-center cursor-pointer"
        onClick={logoutUser}
      >
        <img src={profileIcon} alt="profile" />
      </div>
      <div className="flex items-center gap-4">
        <span>فرابار پرواز</span>
        <img className="w-10 h-10" src={logo} alt="air-logo" />
      </div>
    </header>
  );
}

export default Header;
