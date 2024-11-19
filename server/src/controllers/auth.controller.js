import { generateToken } from '../libs/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body;
    try {
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
export const login = (req,res) =>{
    res.send('Login route');
};
export const logout = (req,res) =>{
    res.send('Logout route');
};