import ProjectName from "@/component/ProjectName";
import VerticleNavBar from "@/component/VerticleNavBar"
import { findGroupById } from "../../../../lib/groupCrud";

type Props = {
  children: React.ReactNode;
  params: Promise<{ "g-id": string }>;
};

export default async function RootLayout({ children, params }: Props) {
    const resolvedParams = await params;
    const groups = await findGroupById(resolvedParams['g-id']);
    const group = groups.length > 0 ? groups[0] : "Unknown Group";

  return (
    <>
      <ProjectName group={group} />      
      
      <VerticleNavBar params={resolvedParams} />

      <div className="pl-20 h-full w-full ">
        {children}
      </div>      
      
    </>


  );
}
