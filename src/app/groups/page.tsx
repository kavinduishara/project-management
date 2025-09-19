import React from "react";
import { getMyGroups } from "../../../lib/groupCrud";
import { AiOutlinePlus  } from "react-icons/ai";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { currentUser } from "@clerk/nextjs/server";


type member={
  name:string,
  role:string
}

async function Page() {
  const groups = await getMyGroups();
  const user = await currentUser(); 
  const memberName = user?.username;

  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="p-4 m-4 font-bold text-4xl">All projects</h1>

      <div className="mt-10 flex flex-wrap justify-start mx-20 px-2">
        {groups.map(
          (
            group: { groupName: string; members: member[],_id:string },
            index: number
          ) => (
            <ProjectCard key={`group-${index}`} group={group} name={memberName?memberName:"-"}/>
          )
        )}
        <div
          className="flex flex-col justify-center items-center w-1/3 rounded-lg shadow-2xl m-4 p-4 hover:shadow-2xl transition-shadow"
        >
          <Link href={"/create"}>
             <AiOutlinePlus className="w-25 h-25 text-gray-700" /> 
          </Link>
        </div>
      </div>

      {groups.length === 0 && <p>No groups found.</p>}
    </div>
  );
}

export default Page;
