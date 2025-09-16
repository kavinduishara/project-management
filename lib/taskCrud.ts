import dbConnect from "./dbConnect";
import Task,{TaskType} from "./Tasks";



export async function getTasksInGroup(id:string) {
    await dbConnect();
    try {
        const tasks = await Task.find({ groupID:id });
        console.log("tasks", tasks);
        return JSON.parse(JSON.stringify(tasks));
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}
export async function getAllTasks() {
    await dbConnect();
    try {
        const tasks = await Task.find();
        console.log("tasks", tasks);
        return JSON.parse(JSON.stringify(tasks));
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}

export async function changeTask(id:string,task:TaskType) {
    await dbConnect();
    try {
        const tasks = await Task.updateOne({ _id:id }, 
          { $set: { status: task.status,
            assignedTo: task.assignedTo,
            duration: task.duration,
            preRequsitse: task.preRequsitse,
            taskName: task.taskName,
            progress: task.progress
           } });
        console.log("tasks", tasks);
        return JSON.parse(JSON.stringify(tasks));
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}

export async function addTask( task: TaskType) {
  await dbConnect();
  try {
    const newTask = await Task.create(task);

    return JSON.parse(JSON.stringify(newTask)); 
  } catch (error) {
    console.log(error)
    return null;
  } 
}

export async function getTaskById(id:string) {
    await dbConnect();
    try {
        const tasks = await Task.find({ _id:id });
        console.log("tasks", tasks);
        return JSON.parse(JSON.stringify(tasks));
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}