import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const cookieCheck = (req, res, next) => {
  const cookie = req.cookies.accessToken;
  console.log("cookie value", cookie);

  if (!cookie) res.status(401).json({ message: "Not Authenticated!" });
  try {
    jwt.verify(cookie, process.env.ACCESS_SECRET_KEY, (err, user) => {
      // Token expired
      if (err?.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      // Invalid token
      if (err) return res.status(403).json({ error: "Invalid token" });

      // set available in all controller
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("error while cookieCheck middleware", error);
  }
};

export default cookieCheck;
