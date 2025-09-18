import ProjectName from "@/component/ProjectName";
import VerticleNavBar from "@/component/VerticleNavBar"
import { findGroupById } from "../../../../lib/groupCrud";

type Props = {
  children: React.ReactNode;
  params: Promise<{ "g-id": string }>;
};

export default async function RootLayout({ children, params }: Props) {
    const resolvedParams = await params;
    const group = await findGroupById(resolvedParams['g-id']);

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
