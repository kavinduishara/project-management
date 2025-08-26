import mongoose,{Schema} from "mongoose";

const groupSchema=new Schema({
    groupName:{
        type:String,
        required:true,
    },
    members:[{
        type:String,
        required:true,
    }],
    createdAt:{    
        type:Date,
        default:Date.now,
    },
})

const Group=mongoose.models.Group || mongoose.model("Group",groupSchema);

export default Group;
