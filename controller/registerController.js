import User from "../database/model/user.js";
import bcryptjs from 'bcryptjs';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = 10;
  if (!username || !email || !password) {
    console.log("some data is not reaching");
    return;
  }

  try {
    const checkUser = await User.findOne({ email });
    console.log("check user ", checkUser);
    if (checkUser) {
      res.status(409).json({
        message: "user already exist with this email, try new one!",
      });
      return;
    }
    // converting plain password  
    const incrypt_Password = await bcryptjs.hash(password, salt);

    const createUser = new User({ username, email, password: incrypt_Password });

    const checkCreatedUser = await createUser.save();
    console.log(checkCreatedUser);
    if (checkCreatedUser) {
      res.status(201).json({ message: "user registered" });
    }
  } catch (error) {
    console.log('error while register a user at registerController try catch handler..',error);
  }
};

export default registerUser;
