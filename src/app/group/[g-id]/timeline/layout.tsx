type Props = {
  children: React.ReactNode;
  params: Promise<{ "g-id": string }>;
};

export default async function RootLayout({ children, params }: Props) {

  return (
    <>
    <div>
        <div className="p-4 border-b bg-white shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>
        </div>
        {children}
    </div>  
    </>
  );
}
