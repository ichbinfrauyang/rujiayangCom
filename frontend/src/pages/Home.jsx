import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React from "react";
import MovingComponent from "react-moving-text";
import { FiLogOut } from "react-icons/fi";

import { useContext, useState } from "react";
import Menu from "../components/Menu";
import { UserContext } from "../context/userContext";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="border-b-2 border-opacity-55 flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="pt-5 text-lg text-[rgb(126,77,243)] md:text-3xl  font-bold ">
          <Link to="/">
            <b className="text-black">R</b>
            ujia <a className="text-black">Y</a>ang
          </Link>
        </h1>
        {/* pending amend  if user then about+blog+menu*/}
        {user ? (
          <div className="bg-[rgb(245,212,114)] p-[10px] text-[rgb(17,4,50)] font-bold text-2xl hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            <h3>
              <Link to="/about">About</Link>
            </h3>
            <h3>
              <Link to="/blog">Blog</Link>
            </h3>
            <h3>
              <Link to="/Board">Board</Link>
            </h3>
            <div onClick={showMenu} className="text-lg">
              <p className="cursor-pointer relative">
                <FiLogOut />
              </p>
              {menu && <Menu />}
            </div>
          </div>
        ) : (
          <div className="bg-[rgb(245,212,114)] p-[10px] text-[rgb(17,4,50)] font-bold text-2xl hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            <h3>
              <Link to="/about">About</Link>
            </h3>
            <h3>
              <Link to="/blog">Blog</Link>
            </h3>
            <h3>
              <Link to="/Board">Board</Link>
            </h3>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          </div>
        )}
      </div>
      <div className="font-dancing text-6xl pt-40 h-[65vh] px-8 md:px-[200px] min-h-[68vh]">
        <button className="bg-[rgb(126,77,243)] font-sans text-white">Hi!</button>

        <MovingComponent
          type="squeezeMix"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="5"
          fillMode="none"
          className="text-4xl pt-7"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;Welcome to my corner of the web, where I’m focused on building the
          future—one bold idea at a time. Here, you'll find a blend of strategic insights,
          continuous learning, and a touch of humor as I navigate the journey towards what's next...
        </MovingComponent>
      </div>
      <Footer />
    </>
  );
};

export default Home;
