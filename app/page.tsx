'use client'

import { createSpread } from "@/data/spreads";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-32 px-16 bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-300">
            Welcome!
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-col items-center p-6">
              <p className="text-lg leading-8 text-zinc-300 dark:text-zinc-300 m-4">
                Add your next tarot spread
              </p>          
              <Link
                className="flex leading-loose w-full items-center justify-center gap-2 rounded-full bg-zinc-600 px-6 py-2 text-zinc-300 transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-auto whitespace-wrap"
                href="/spreads/new"
                rel="noopener noreferrer"
              >
                Add Spread
              </Link>
            </div>
            <div className="flex flex-col items-center p-6">
              <p className="max-w-md text-lg leading-8 text-zinc-300 dark:text-zinc-300 m-4">
                Review and edit your previous spreads
              </p> 
              <Link
                className="flex leading-loose w-full items-center justify-center gap-2 rounded-full bg-zinc-600 px-6 py-2 text-zinc-300 transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-auto whitespace-wrap"
                href="/spreads"
                rel="noopener noreferrer"
              >
                See Previous Readings
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}