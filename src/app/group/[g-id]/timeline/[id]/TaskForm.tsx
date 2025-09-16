"use client"

import React, { useActionState,useEffect,useState } from 'react'
import { updateTask, FormState } from '@/actions/task';
import { TaskType } from '../../../../../../lib/Tasks';
import { redirect } from 'next/navigation';


type TasksType = {
  _id: string;
} & TaskType;

type Props = {
    
  tasksList: {_id:string,taskName:string}[],
  members:string[],
  groupId: string,
  task:TasksType
};

function TaskForm({tasksList,members,groupId,task}: Props) {


    const [localTasks, setLocalTasks] = useState(tasksList);
    console.log(task)

    

    const initialState: FormState = {
      error: undefined,
      success: undefined,
      newOne:undefined
    };
    const  [state,formAction,isPending]=useActionState(
      updateTask,
      initialState
    )


  return (
    <div>
        <form className="flex flex-col gap-4 p-4" action={formAction}>
            <h1>Add New Entry</h1>
            <input 
                type="text" 
                placeholder="Title" 
                name="title"
                defaultValue={task.taskName}
                required
            />
            <input type="hidden" name='groupId' value={groupId} />
            <input type="hidden" name='task' value={task._id} />
            <select name='taskId' multiple defaultValue={task.preRequsitse}>
                {localTasks.map((task:{_id:string,taskName:string})=>
                  <option key={task._id} value={task._id}>{task.taskName}</option>
                )}
            </select>
            <select name='members' required defaultValue={task.assignedTo[0]}>
                {members.map((member:string)=>
                  <option key={member} value={member}>{member}</option>
                )}
            </select>
            <input type="number" placeholder="Duration (hours)" name='duration' defaultValue={task.duration} />
            <select defaultValue={task.duration} name='status' required>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <button type="submit" disabled={isPending}>Add Entry</button>
            {state.error && <p className="text-red-500">Error: {state.error.message}</p>}
            {state.success && redirect("group/"+groupId+"/timeline")}
            {isPending && <p className="text-blue-500">Adding task...</p>}

        </form>
    </div>
  )
}

export default TaskForm