"use client";
import { useGroup } from "@/context/GroupProvider";
export default function ClientConsumer() {
  const group = useGroup();
  return <div>Client: {group.members}</div>;
}