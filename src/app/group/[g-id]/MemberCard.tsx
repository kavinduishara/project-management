import { clerkClient } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react';

type Props = {
  member: { name: string; role: string };
};

async function MemberCard({ member }: Props) {
  const client = await clerkClient();
  const usersResponse = await client.users.getUserList({
    username: [member.name],
  });
  const user = usersResponse.data[0];
  const iUrl = user?.imageUrl || "/default-profile.png"; // fallback image

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
      <Image
        src={iUrl}
        alt={`${member.name} Profile`}
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{member.name}</h2>
        <p className="text-sm text-gray-500">{member.role}</p>
      </div>
    </div>
  );
}

export default MemberCard;
