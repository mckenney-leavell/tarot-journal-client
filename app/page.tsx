'use client'

import { createSpread } from "@/data/spreads";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center pt-32 px-16 bg-white dark:bg-gray-950">
        <div className="flex flex-col mx-20 mt-20 items-center gap-6 w-full h-full text-center">
          <h1 className="text-5xl leading-8 font-semibold leading-10 tracking-tight text-black dark:text-zinc-300 p-4">
            Welcome to Your Tarot Journal!
          </h1>
          <h2 className="text-2xl">Track your readings</h2>
          <div className="flex flex-wrap gap-5 w-full h-full justify-center">
            <div className="flex flex-col lg:w-1/3 sm:w-2/3 items-center text-center">
              <Link
                className="bg-gray-900 border border-gray-700 flex flex-col justify-center items-center w-full h-full p-6 rounded-lg shadow-xs hover:bg-gray-800 text-center"
                href="/spreads/new"
                rel="noopener noreferrer"
              >
                <h5 className="mb-3 text-3xl font-semibold tracking-tight text-heading leading-8">Add Spread</h5>              
                <p className="text-lg leading-8 text-zinc-300 dark:text-zinc-500">
                Add your next tarot spread
                </p>               
              </Link>
            </div>
            <div className="flex flex-col lg:w-1/3 sm:w-2/3 items-center">
                <Link
                className="bg-gray-900 border border-gray-700 flex flex-col justify-center items-center w-full h-full p-6 rounded-lg shadow-xs hover:bg-gray-800 text-center"
                href="/spreads/new"
                rel="noopener noreferrer"
              >
                <h5 className="mb-3 text-3xl font-semibold tracking-tight text-heading leading-8">See Previous Readings</h5>              
                <p className="text-lg leading-8 text-zinc-300 dark:text-zinc-500">
                Review and edit your previous spreads
                </p>                
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}