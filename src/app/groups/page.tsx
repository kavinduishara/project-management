import React from "react";
import { getMyGroups } from "../../../lib/groupCrud";
import Image from "next/image";

async function Page() {
  const groups = await getMyGroups();

  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="p-4 m-4 font-bold text-4xl">All projects</h1>

      <div className="mt-10 flex flex-wrap justify-start mx-20 px-2">
        {groups.map(
          (
            group: { groupName: string; members: string[] },
            index: number
          ) => (
            <div
              key={`group-${index}`}
              className="flex flex-col justify-between w-72 rounded-lg shadow-2xl border-2 border-amber-200 m-4 p-4 hover:bg-amber-50"
            >
              <div className="flex items-center">
                <div className="border-2 rounded-md border-amber-200 w-20 h-20 m-4 flex items-center justify-center">
                  <Image
                    src="/hive5.png" // 🔥 place hive.png inside /public
                    alt="Group Icon"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                <h2 className="text-amber-600 m-4 text-lg font-semibold">
                  {group.groupName}
                </h2>
              </div>

              {/* Progress bar */}
              <div className="w-full mt-4 border-orange-500 border-2 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full"
                  style={{ width: "60%" }} // TODO: replace with real progress
                />
              </div>
            </div>
          )
        )}
      </div>

      {groups.length === 0 && <p>No groups found.</p>}
    </div>
  );
}

export default Page;
