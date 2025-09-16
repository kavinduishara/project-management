"use client"

import React, { useActionState,useEffect } from 'react'
import { createTask, FormState } from '@/actions/task';

type Props = {
    
  tasksList: {_id:string,taskName:string}[],
  members:string[],
  groupId: string,
};

function TaskForm({tasksList,members,groupId}: Props) {


    const [localTasks, setLocalTasks] = React.useState(tasksList);

    

    const initialState: FormState = {
      error: undefined,
      success: undefined,
      newOne:undefined
    };
    const  [state,formAction,isPending]=useActionState(
      createTask,
      initialState
    )

    useEffect(() => {
      if (state.newOne) {
        setLocalTasks(prev => [...prev, state.newOne]);
      }
    }, [state.newOne]);

  return (
    <div>
        <form className="flex flex-col gap-4 p-4" action={formAction}>
            <h1>Add New Entry</h1>
            <input 
                type="text" 
                placeholder="Title" 
                name="title"
                required
            />
            <input type="hidden" name='groupId' value={groupId} />
            <select name='taskId' multiple>
                {localTasks.map((task:{_id:string,taskName:string})=>
                  <option key={task._id} value={task._id}>{task.taskName}</option>
                )}
            </select>
            <select name='members' required>
                {members.map((member:string)=>
                  <option key={member} value={member}>{member}</option>
                )}
            </select>
            <input type="number" placeholder="Duration (hours)" name='duration' />
            <select defaultValue="To Do" name='status' required>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <button type="submit" disabled={isPending}>Add Entry</button>
            {state.error && <p className="text-red-500">Error: {state.error.message}</p>}
            {state.newOne && <p className="text-green-500">Task added successfully!</p>}
            {isPending && <p className="text-blue-500">Adding task...</p>}

        </form>
    </div>
  )
}

export default TaskForm