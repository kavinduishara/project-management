import VerticleNavBar from "@/component/VerticleNavBar"

type Props = {
  children: React.ReactNode;
  params: { "g-id": string };
};

export default function RootLayout({ children, params }: Props) {
  return (
    <>
      <VerticleNavBar params={params} />
      <div className="ml-30">
        {children}
      </div>
    </>
  );
}
