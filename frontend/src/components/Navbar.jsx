import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  // console.log(param);
  const showMenu = () => {
    setMenu(!menu);
  };
  const { user } = useContext(UserContext);
  // console.log(user);
  return (
    <div className="border-b-2 border-opacity-55  flex  items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="pt-5 text-lg text-[rgb(126,77,243)] md:text-3xl  font-bold ">
        <Link to="/">
          <b className="text-black">R</b>
          ujia <b className="text-black">Y</b>ang
        </Link>
      </h1>
      {/* Search Bar */}
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
            className="cursor-pointer"
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      <div className="text-[rgb(17,4,50)] p-[10px] bg-[rgb(245,212,114)] font-bold text-2xl hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {/* 有用户 */}
        <h3>
          <Link to="/about">About</Link>
        </h3>
        <h3>
          <Link to="/blog">Blog</Link>
        </h3>
        <h3>
          <Link to="/board">Board</Link>
        </h3>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FiLogOut />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FiLogOut />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
