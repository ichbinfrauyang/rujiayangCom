import Footer from "../components/Footer";
import Loader from "../components/Loader";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";

import { UserContext } from "../context/userContext";

import axios from "axios";
import { URL } from "../url";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Blog = () => {
  const { search } = useLocation();
  // console.log(search);
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const showMenu = () => {
    setMenu(!menu);
  };
  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="border-b-2 border-opacity-55 flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="pt-5 text-lg text-[rgb(126,77,243)] md:text-3xl  font-bold ">
          <Link to="/">
            <b className="text-black">R</b>
            ujia <a className="text-black">Y</a>ang
          </Link>
        </h1>
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
        </div>
      </div>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={`/posts/post/${post._id}`}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
