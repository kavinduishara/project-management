import { Metadata } from "next";
import AddMembers from "./add/AddMembers";
import { findGroupById } from "../../../../lib/groupCrud";
import MemberCard from "./MemberCard";
import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  params: Promise<{ "g-id": string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams["g-id"];

  return {
    title: `Group ${id}`,
    description: `Group ${id}`,
  };
}

async function Group({ params }: Props) {
  const resolvedParams = await params;
  const groups = await findGroupById(resolvedParams["g-id"]);

  return (
    <div className="p-6 space-y-6">
      {/* Members Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Group Members</h2>
          
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {groups.members.map((member: { name: string; role: string }) => (
            <MemberCard key={member.name} member={member} />
          ))}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow justify-center">
            <Link
              href={`/group/${resolvedParams["g-id"]}/add`}
              className="flex items-center gap-2  text-gray-600 font-medium px-4 py-2 rounded-xl hover:text-green-600 transition"
            >
              <AiOutlinePlus className="w-25 h-25" /> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;
