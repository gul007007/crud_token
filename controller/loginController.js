import User from "../database/model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  console.log(loginEmail, loginPassword);
  if (!loginEmail || !loginPassword) {
    console.log("some data is missing during login");
    return;
  }

  try {
    // fetch user to check it is registered or NOT
    const checkRegisteration = await User.findOne({ email: loginEmail });

    console.log("fetched user", checkRegisteration);
    if (!checkRegisteration) {
      res
        .status(404)
        .json({ message: "User not found, kindly register first & try login" });
        return;
    }

    // after checking user exist ~ check its password is also matched with hash
    const comparePasswords = await bcryptjs.compare(
      loginPassword,
      checkRegisteration.password
    );
    console.log("compare password ", comparePasswords);
    if(!comparePasswords){
        res.status(404).json({message: 'provide correct password'});
        return;
    }

    // user & password exist in db ~ generate JWT cookie

    //token1
    const accessToken = jwt.sign({_id: checkRegisteration._id,email: checkRegisteration.email}, process.env.ACCESS_SECRET_KEY,{expiresIn: '4m'});
    //token2
    const refreshToken = jwt.sign({_id: checkRegisteration._id}, process.env.REFRESH_SECRET_KEY, {expiresIn: '2h'});

    // sending token to cookie
    res.cookie("accessToken", accessToken, {httpOnly: true,secure: true, sameSite: "Strict", maxAge: 4 * 60 * 1000});
    res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "Strict", secure:true, maxAge: 120 * 60 * 1000});

    res.status(200).json({ message: "login ..." });
  } catch (error) {
    console.log("error while login controller", error);
  }
};

// token reNew
export const refreshToken = async(req,res)=>{
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if(err) return res.sendStatus(403);

    console.log('user value', user);
    console.log('new user value', req.user);
    
    
    const newaccessToken = jwt.sign({_id: user._id}, process.env.ACCESS_SECRET_KEY, {expiresIn: "4m"});

    res.cookie("accessToken", newaccessToken, {httpOnly: true,secure:true, sameSite: "Strict", maxAge: 4 * 60 * 1000});

    res.json({message: "Token updated"})

  });

};



