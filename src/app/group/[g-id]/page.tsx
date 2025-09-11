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
  <div className="m-2">

    <div>
      {
        groupMembers.map((member: string) => (
          <div key={member}>{member}</div>
        ))
      }
    </div>
    <div className="">
        <AddMembers params={resolvedParams} />
    </div>

  </div>
  )
}


export default Group
