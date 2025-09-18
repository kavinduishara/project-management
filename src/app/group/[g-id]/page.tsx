import { Metadata } from "next";
import AddMembers from "./add/AddMembers";
import { findGroupById } from "../../../../lib/groupCrud";
import MemberCard from "./MemberCard";
import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";

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
          <Link
            href={`/group/${resolvedParams["g-id"]}/add`}
            className="flex items-center gap-2 bg-sky-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-sky-600 transition"
          >
            <BsPlusCircle className="w-5 h-5" /> Add Member
          </Link>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {groups.members.map((member: { name: string; role: string }) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Group;
