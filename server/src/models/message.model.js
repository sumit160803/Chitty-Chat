import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId, //object id of the sender
            ref: 'User',  //refernce to the User model
            required: true,
        },
        receiverId:{
            type: mongoose.Schema.Types.ObjectId, //object id of the receiver
            ref: 'User', //refernce to the User model
            required: true,
        },
        text:{
            type: String
        },
        media:{
            type: String
        }
    },
    {
        timestamps: true //to show createdAt field
    }
);

const Message = mongoose.model('Message',messageSchema);

export default Message;
