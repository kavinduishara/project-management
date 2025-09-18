import Link from "next/link";
import { findGroupById } from "../../../../../lib/groupCrud";
import { BsPlusSquare } from "react-icons/bs";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ "g-id": string }>;
};

export default async function RootLayout({ children, params }: Props) {
    const resolvedParams = await params;
    const groups = await findGroupById(resolvedParams['g-id']);
    const group = groups.length > 0 ? groups[0] : "Unknown Group";
    const baseurl = `/group/${resolvedParams['g-id']}/timeline`;  
    
  return (
    <>
      <div className=" h-full w-full ">
        <div className="p-4 border-b bg-white shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Time table</h1>
        </div>
        <NavBar baseurl={baseurl} />
        {children}
      </div>      
      
    </>


  );
}
