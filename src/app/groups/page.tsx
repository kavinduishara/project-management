import React from "react";
import { getMyGroups } from "../../../lib/groupCrud";
import Image from "next/image";
import { AiOutlinePlus  } from "react-icons/ai";
import Link from "next/link";

type member={
  name:string,
  role:string
}

async function Page() {
  const groups = await getMyGroups();

  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="p-4 m-4 font-bold text-4xl">All projects</h1>

      <div className="mt-10 flex flex-wrap justify-start mx-20 px-2">
        {groups.map(
          (
            group: { groupName: string; members: member[],_id:string },
            index: number
          ) => (
            <div
              key={`group-${index}`}
              className="flex flex-col justify-between w-72 rounded-lg shadow-2xl border-2 border-sky-200 m-4 p-4 hover:bg-sky-50"
            >
              <div className="flex items-center">
                <div className="border-2 rounded-md border-sky-200 w-20 h-20 m-4 flex items-center justify-center">
                  <Image
                    src="/hive5.png" // 🔥 place hive.png inside /public
                    alt="Group Icon"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                <Link href={"/group/" +group._id}>
                  <h2 className="text-sky-600 m-4 text-lg font-semibold">
                    {group.groupName}
                  </h2>
                </Link>
              </div>

              {/* Progress bar */}
              <div className="w-full mt-4 border-sky-500 border-2 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full"
                  style={{ width: "60%" }} // TODO: replace with real progress
                />
              </div>
            </div>
          )
        )}
        <div
          className="flex flex-col justify-center items-center w-72 h-72 rounded-lg shadow-2xl border-2 border-sky-600 m-4 p-4 bg-sky-400 hover:bg-sky-500"
        >
          <Link href={"/create"}>
             <AiOutlinePlus className="w-32 h-32 text-white" /> 
          </Link>
        </div>
      </div>

      {groups.length === 0 && <p>No groups found.</p>}
    </div>
  );
}

export default Page;
