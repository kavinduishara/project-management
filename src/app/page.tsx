import Image from "next/image";

export default function Home() {
  return (
    <div className="z-10 font-sans grid items-center justify-items-center min-h-screen  p-8 pb-20 gap-16 sm:p-20">
      <div className="grid grid-cols-2 gap-3 w-full ">
        <div className="flex justify-center gap-5 rounded-lg w-full h-full">
          <div className="gap-6 grid grid-cols-1">
            <div className="text-6xl font-bold gap-4 grid grid-cols-1">
                <div className=''><span className='text-orange-500'>HiveMind</span></div>
                <div>WHERE </div>
                <div>COLABORATION</div>
                <div>FLOWS LIKE A HIVE.</div>
            </div>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-md">
              HiveMind brings your team together in one place making collaboration, task
              management, and communication flow as naturally as a hive.
            </p>

          </div>

        </div>
      
        <div className="z-0 grid grid-cols-1 justify-center">
          <div className="w-48 h-48 bg-orange-400 rounded-full">

          </div>
          <div className="w-96 h-96 border-2 border-orange-400 rounded-full">

          </div>
        </div>
  </div>
</div>

  );
}
