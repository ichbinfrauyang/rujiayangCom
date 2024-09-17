import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jsonwebtoken.verify(token, process.env.SECRET, async (error, data) => {
    if (error) {
      return res.status(403).json("Token is not valid!");
    }
    req.userId = data._id;
    // console.log("passed");
    next();
  });
};

export default verifyToken;
