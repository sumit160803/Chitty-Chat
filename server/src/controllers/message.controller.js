import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async(req,res)=> {
    try {   
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json({filteredUsers});     
    } 
    catch (error) {
        console.log("Error in getUsersForSidebar: ",error);
        return res.status(500).json({message:"Internal Server Error"});
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
        return res.status(500).json({message:"Internal Server Error"});
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
    
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            media:mediaUrl
        });
        
        await newMessage.save();
    
        //todo: real time message sending

        return res.status(200).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage: ",error);    
        return res.status(500).json({message:"Internal Server Error"});
    }
};