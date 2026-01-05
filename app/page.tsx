'use client'

import { createSpread } from "@/data/spreads";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  
    const handleSaveClick = () => {
        createSpread({
            title: "",
            interpretation: ""
        }).then(spread => {
          console.log("New spread object:", spread)
          router.push(`/spreads/new?id=${spread?.id}`)
        })
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome!
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-col items-center p-6">
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 m-4">
                Add your next tarot spread
              </p>          
              <button
                className="flex leading-loose w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-auto whitespace-wrap"
                onClick={handleSaveClick}
                rel="noopener noreferrer"
              >
                Add Spread
              </button>
            </div>
            <div className="flex flex-col items-center p-6">
              <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 m-4">
                Review and edit your previous spreads
              </p> 
              <Link
                className="flex leading-loose w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-auto whitespace-wrap"
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
