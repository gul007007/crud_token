const logout = async(req,res)=>{
    
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({message: "log-out success"})
    
};
export default logout;