import React from "react";
import { getTasksInGroup } from "../../../../../lib/taskCrud";
import GanttChart from "./GanttChart";


type Props = {
  params: Promise<{ "g-id": string }>;
};
type TasksType = {
  _id: string;
  groupID:string,
  taskName:string,
  preRequsitse?:string[],
  assignedTo?:string[],
  status?:'To Do' | 'In Progress' | 'Done',
  createdAt?:Date,
  duration?:number,
  progress?:number,
}

async function page({params}:Props) {
    const resolvedParams = await params;
    const groupId = resolvedParams['g-id'];
    const tasksList:TasksType[]= await getTasksInGroup(groupId);
    return(
      <>
        <GanttChart tasksList={tasksList}/>
      </>
    )

}

export default page