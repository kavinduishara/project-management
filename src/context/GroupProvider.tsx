// GroupProvider.tsx (client)
"use client";
import { createContext, useContext } from "react";

type Member = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
  members?: Member[];
};

const GroupContext = createContext<Group | null>(null);

export function GroupProvider({ group, children }: { group: Group | null; children: React.ReactNode }) {
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}

export function useGroup(): Group | null {
  return useContext(GroupContext);
}
