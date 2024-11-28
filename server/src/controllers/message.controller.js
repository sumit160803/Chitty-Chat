import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../libs/cloudinary.js';
import {getReceiverSocketId, io} from '../libs/socket.js';

export const getUsersForSidebar = async(req,res)=> {
    try {   
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json({filteredUsers});     
    } 
    catch (error) {
        console.log("Error in getUsersForSidebar: ",error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
};

export const getMessages = async(req,res) => {
    try {
        const {id:UserToChatId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId,receiverId:UserToChatId},
                {senderId:UserToChatId,receiverId:myId}
            ]
        });
        return res.status(200).json(message);
    } 
    catch (error) {
        console.log("Error in getMessages: ",error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
};

export const sendMessage = async(req,res) => {

    try{
        const {text,media} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
    
        let mediaUrl = "";
        if(media){
            const uploadedResponse = await cloudinary.uploader.upload(media);
            mediaUrl = uploadedResponse.secure_url;
        }

        //todo: to stop server from crashing due to large file size

        // const mediaSize = Buffer.byteLength(media, 'base64'); // Size in bytes
        // if (mediaSize > MAX_FILE_SIZE) {
        //     return res.status(400).json({ msg: "File size exceeds 100Kb limit." });
        // }
    
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            media:mediaUrl
        });
        
        await newMessage.save();
    
        //todo: real time message sending
        const receiverSocketId = getReceiverSocketId(receiverId);
        //if receiver is online then send the message particulary to him 
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }

        return res.status(200).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage: ",error);    
        return res.status(500).json({msg:"Internal Server Error"});
    }
};