import VerticleNavBar from "@/component/VerticleNavBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <VerticleNavBar/>
        <div className="m-0.5">
          {children}
        </div>
        
      </>
  )
}
