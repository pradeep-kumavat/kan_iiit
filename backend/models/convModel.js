import mongoose from "mongoose";

const convModel = new mongoose.Schema({
     participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
     }],
     message:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
     }]
}, {timestamps:true});

export const Conv = mongoose.model("Conv",convModel);

