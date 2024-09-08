import { Conv } from "../models/convModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) =>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation = await Conv.findOne({
            participants: {$all : [senderId, receiverId]},
        });
        
        if(!gotConversation){
            gotConversation = await Conv.create({
                participants:[senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            gotConversation.message.push(newMessage._id);
        }

        await Promise.all([gotConversation.save(), newMessage.save()]);
         
        // SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage
        })
       } catch (error) {
        console.log(error);
    }
};
    //     await gotConversation.save();

    //     return res.status(201).json({
    //         message: "Message sent successfully."
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
//};

export const getMessage = async (req, res) =>{
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conv.findOne({
             participants:{$all : [senderId, receiverId]}
        }).populate("message");
        //console.log(conversation.message);
        return res.status(200).json(conversation?.message);
    } catch (error) {
        console.log(error);
    }
}