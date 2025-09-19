import React from 'react'
import Image from "next/image";
import { AiOutlinePlus  } from "react-icons/ai";
import Link from "next/link";
import { getTasksInGroup } from '../../../lib/taskCrud';
import { elements } from 'chart.js';

type member={
  name:string,
  role:string
}


async function ProjectCard({group,name}:{group:{ groupName: string; members: member[],_id:string },name:string}) {
    const tasks=await getTasksInGroup(group._id)
    const count = new Map([
    ["To Do", 0],
    ["In Progress", 0],
    ["Done", 0],
    ["Total", 0],
    ]);

    tasks.forEach((element: { status: string }) => {
    if (count.has(element.status)) {
        count.set(element.status, count.get(element.status)! + 1);
    }
    count.set("Total", count.get("Total")! + 1);
    });

    // Example: get counts
    console.log("To Do:", count.get("To Do"));
    console.log("In Progress:", count.get("In Progress"));
    console.log("Done:", count.get("Done"));
    console.log("Total:", count.get("Total"));


  return (
        <div
            
            className=" w-1/3 flex flex-col justify-center items-center rounded-lg shadow-xl  m-4 p-4 hover:shadow-3xl"
        >
            <div className="flex items-center">
                <div className=" w-20 h-20 m-4 flex items-center justify-center">
                    <Image
                    src="/hive5.png" // 🔥 place hive.png inside /public
                    alt="Group Icon"
                    width={60}
                    height={60}
                    className="object-contain"
                    />
                </div>
                <div>
                    <Link href={"/group/" +group._id}>
                    <h2 className="  text-lg font-semibold">
                        {group.groupName.toUpperCase()}
                    </h2>
                    </Link>
                    <h2 className='text-sm text-gray-400'>
                        {group.members.find(t=>t.name===name)?.role}
                    </h2>  
                </div>
            
            </div>

            <div className='flex text-4xl gap-3'>
                <div className='m-2 '>
                    <h1 className='text-sm text-stone-400'>To Do</h1>
                    <h1>{count.get("To Do")}</h1>

                </div>
                <div className='m-2 '>
                    <h1 className='text-sm text-stone-400'>Ongoing</h1>
                    <h1>{count.get("In Progress")}</h1>
                </div>
                <div className='m-2'>
                    <h1 className='text-sm text-stone-400'>Done</h1>
                    <h1>{count.get("Done")}</h1>
                </div>
                <div className='m-2'>
                    <h1 className='text-sm text-stone-400'>Total</h1>
                    <h1>{count.get("Total")}</h1>
                </div>
            </div>
            
        </div>
  )
}

export default ProjectCard