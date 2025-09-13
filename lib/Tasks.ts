import mongoose,{Schema} from "mongoose";

const TaskSchema=new Schema({
    groupID:{
        type:String,
        required:true,
    },
    taskName: {
        type: String,
        required: true,
    },
    preRequsitse: [{
        type: String,
        required: false,
    }],
    assignedTo: [{
        type: String,
        required: false,
    }],
    status: {  
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    duration:{
        type:Number,
        required:false,
    }
})

const Task=mongoose.models.Group || mongoose.model("Group",TaskSchema);

export default Task;
