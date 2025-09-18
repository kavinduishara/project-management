import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <>
      {/* If signed in → redirect */}
      <SignedIn>
        {redirect("/groups")}
      </SignedIn>

      {/* If signed out → show landing page */}
      <SignedOut>
        <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
          {/* Decorative blurred circles */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

          {/* Content */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 px-8 sm:px-16 lg:px-24 max-w-7xl w-full items-center">
            
            {/* Left side - text */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
                <span className="text-green-500">HiveMind</span> <br />
                Where <span className="text-gray-800">Collaboration</span> <br />
                Flows Like a Hive
              </h1>

              <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-md">
                HiveMind brings your team together in one place — making collaboration,
                task management, and communication flow as naturally as a hive.
              </p>

              <div className="mt-6 flex gap-4">
                <button className="px-6 py-3 rounded-2xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition">
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-2xl border border-green-500 text-green-500 font-semibold hover:bg-green-50 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right side - illustration */}
            <div className="relative flex justify-center items-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-green-400 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute w-96 h-96 border-4 border-green-300 rounded-full animate-ping"></div>
            </div>
          </div>
        </main>
      </SignedOut>
    </>
  );
}
