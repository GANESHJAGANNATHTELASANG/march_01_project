import jwt from "jsonwebtoken";
import User from "../models/user.js";

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, messsage: "user token not recived " });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        messsage: "token verification or not decoding",
      });
    }

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        messsage: "user did not founded in middleare",
      });
    }

    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some internel problem in middleware" });
  }
};

export default middleware;
