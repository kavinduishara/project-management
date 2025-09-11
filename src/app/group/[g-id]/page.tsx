import { Metadata } from "next"
import AddMembers from "./AddMembers"
import { findGroupById } from "../../../../lib/groupCrud";
import ClientConsumer from "./ProjectMembers";

type Props = {
  params: Promise<{ "g-id": string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams["g-id"];

  return {
    title: `group ${id}`,
    description: `group ${id}`,
  }
}
async function Group({ params }: Props) {
  const resolvedParams = await params;
  console.log("Group page rendered with params:");
  console.log(resolvedParams['g-id'])
  const groups = await findGroupById(resolvedParams['g-id']);
  const groupMembers = groups.length > 0 ? groups[0].members : "Unknown Group";
  return (
  <div className="p-4 space-y-4">

  {/* Members list */}
  <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Group Members</h2>
      <div className="bg-white rounded-xl shadow p-4 m-4">
        <AddMembers params={resolvedParams} />
      </div>
      <div className="space-y-2">
        {groupMembers.map((member: string) => (
          <div
            key={member}
            className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm"
          >
            {member}
          </div>
        ))}
      </div>
    </div>

  </div>

  )
}


export default Group
