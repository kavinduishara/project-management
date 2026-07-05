"use client";
import { useGroup } from "@/context/GroupProvider";
export default function ClientConsumer() {
  const group = useGroup();
  
  if (!group || !group.members) {
    return <div>No members</div>;
  }
  
  return (
    <div>
      Client: 
      {group.members.map((member) => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
}