import { generateToken } from '../libs/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({msg:"All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({msg:"Password must be atleast 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            //made this in utils under libs folder
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }
        else{
            return res.status(400).json({msg:"Failed to create user"});
        }

    } catch (error) {
        console.log("Error in signup controller ", error.message); 
        res.status(500).json({msg:"Internal server error"});
    }
};
export const login = async (req,res) =>{
    const {email , password} = req.body;
    try {  
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        generateToken(user._id,res);
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller ", error.message);
        res.status(500).json({msg:"Internal server error"});
    }
};
export const logout = (req,res) =>{
    try {
        res.cookie('jwt','',{maxAge:0}); //set JWT token to "" and maxAge to 0 to delete the cookie immediatedly 
        return res.status(200).json({msg:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller ", error.message);
        res.status(500).json({msg:"Internal server error"});
        
    }
};
export const updateProfile = async (req,res) =>{
    const {profilePic} = req.body;
    const userId = req.user._id;
    try {
        if(!profilePic){
            return res.status(400).json({msg:"Profile picture is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log("Error in updateProfile controller ", error.message);
        res.status(500).json({msg:"Internal server error"});
    }

};
export const checkAuth = (req,res) =>{
    try {
        return res.status(200).json(req.user);
    } 
    catch (error) {
        console.log("Error in checkAuth controller ", error.message);
        res.status(500).json({msg:"Internal server error"});
    }
};