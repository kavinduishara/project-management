import mongoose,{Schema} from "mongoose";

const messageSchema=new Schema({
    groupId:{
        type:String,
        required:true,
    },
    sender:{
        type:String,
        required:true,
    },
    sentAt:{    
        type:Date,
        default:Date.now,
    },
    message:{
        type:String,
        required:true,
    }
})

const Message=mongoose.models.Message || mongoose.model("Message",messageSchema);

export default Message;
