import Footer from "../components/Footer";
import Comment from "../components/Comment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL, IF } from "../url";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { FiLogOut } from "react-icons/fi";

import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [menu, setMenu] = useState(false);

  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const showMenu = () => {
    setMenu(!menu);
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/api/comments/`);
      setComments(res.data);
      setLoader(false);
    } catch (e) {
      setLoader(true);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPostComments();
  }, []);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }
      );

      window.location.reload(true);
    } catch (err) {
      alert("Please sign in to post a comment!");
      console.log(err);
    }
  };

  return (
    <div>
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
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 px-[200px] mt-8">
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Messages:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} value={comment} />
            ))}
          </div>
          {/* Write a comment */}
          <div className="flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Leave a message for me ..."
              className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-purple-900 text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              POST
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
