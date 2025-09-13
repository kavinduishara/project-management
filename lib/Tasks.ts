import mongoose,{Schema} from "mongoose";

export type TaskType={
    groupID:string,
    taskName:string,
    preRequsitse?:string[],
    assignedTo?:string[],
    status?:'To Do' | 'In Progress' | 'Done',
    createdAt?:Date,
    duration?:number,
    progress?:number,
}

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
    },
    progress:{
        type:Number,
        required:false,
        default:0,
    }
})

const Task=mongoose.models.Group || mongoose.model("Group",TaskSchema);

export default Task;
