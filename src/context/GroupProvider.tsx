// GroupProvider.tsx (client)
"use client";
import { createContext, useContext } from "react";

const GroupContext = createContext<any>(null);

export function GroupProvider({ group, children }: { group: any; children: React.ReactNode }) {
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}

export function useGroup() {
  return useContext(GroupContext);
}
