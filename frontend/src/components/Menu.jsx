import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      // console.log(res);
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && (
        <h3 className="text-white text-sm text-lg hover:text-green-500 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm text-lg hover:text-green-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {/* {user && (
        <h3 className="text-white text-sm text-lg hover:text-green-500 cursor-pointer">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )} */}
      {/* {user && (
        <h3 className="text-white text-sm text-lg hover:text-green-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )} */}
      {/* {user && (
        <h3 className="text-white text-sm text-lg hover:text-green-500 cursor-pointer">
          <Link to={"/myblogs/" + user.id}>My Blogs</Link>
        </h3>
      )} */}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm text-lg hover:text-green-500 cursor-pointer"
        >
          Log out
        </h3>
      )}
    </div>
  );
};

export default Menu;
