import Link from "next/link";
import { findGroupById } from "../../../../../lib/groupCrud";
import { BsPlusSquare } from "react-icons/bs";

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
      <div className=" h-full w-full bg-gray-100">
        <div className="p-4 border-b bg-white shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Time table</h1>
        </div>
        <nav className="flex items-center p-4 gap-5 justify-start text-xl font-bold">
            <Link href={baseurl+"/table"} className=" text-orange-500">
                Table view
            </Link>
            <Link href={baseurl+"/"}  className=" text-orange-500 ">
                Chart view
            </Link>
            <Link href={baseurl+"/add"}  className=" text-orange-500 ">
                Add new
            </Link>


        </nav>
        {children}
      </div>      
      
    </>


  );
}
