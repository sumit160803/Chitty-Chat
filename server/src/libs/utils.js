import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    });
    res.cookie('jwt',token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true, //prevents from XSS attacks
        sameSite:"strict", //protects from CSRF attacks
        secure: process.env.NODE_ENV === 'production' ? true : false //cookie will only be sent over HTTPS in production
    });
    return token;
}