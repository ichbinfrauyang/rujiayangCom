import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-[rgb(242,235,253)] px-8 md:px-[300px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start justify-between text-sm md:text-md py-8">
        <div className="">
          <h1 className="font-bold">Rujia | Yang</h1>
        </div>
        <div className="flex flex-col text-black ">
          <Link to="/about" className="font-bold">
            About
          </Link>
          <Link to="/blog">Blogs</Link>
          <p>More info</p>
        </div>
        <div className="flex flex-col text-black">
          <a href="https://www.youtube.com/" target="_blank" className="font-bold">
            Youtube
          </a>
          <a href="https://twitter.com/" target="_blank">
            Twitter
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            Instagram
          </a>
        </div>
        <div className="flex flex-col text-black ">
          <a href="https://developer.mozilla.org/" target="_blank" className="font-bold">
            MDN
          </a>
          <a href="https://www.youtube.com/#" target="_blank">
            Github
          </a>
          <a href="https://chat.openai.com/" target="_blank">
            ChatGPT
          </a>
          <a href="https://www.freecodecamp.org/" target="_blank">
            FreeCodeCamp
          </a>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-[rgb(126,77,243)] text-sm">
        All rights reserved @www.rujiayang.com | Contact: rrjjyy@outlook.com
      </p>
    </>
  );
};

export default Footer;
