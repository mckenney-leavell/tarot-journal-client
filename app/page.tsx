'use client'

import { createSpread } from "@/data/spreads";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-(--clr-surface-tonal-a10) flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center lg:pt-32 px-16">
        <div className="flex flex-col mx-20 mt-25 items-center gap-6 w-full h-full text-center">
          <h1 className="text-5xl leading-8 font-bold leading-10 tracking-tight text-(--clr-light-a0) p-4">
            Welcome to Your Tarot Journal!
          </h1>
          <h2 className="text-2xl text-(--clr-surface-tonal-a50)">Track and review your readings and learn tarot</h2>
          <div className="lg:grid lg:grid-cols-3 sm:flex sm:flex-col gap-6 mx-auto">
            <Link
              className="bg-(--clr-surface-tonal-a20) border border-(--clr-surface-tonal-a30) hover:border-(--clr-primary-a30) hover:text-(--clr-primary-a30) flex flex-col my-5 justify-center items-center h-full py-20 px-10 rounded-lg text-center text-(--clr-light-a0)"
              href="/cards"
              rel="noopener noreferrer"
            >
            <h5 className="mb-3 text-3xl font-semibold tracking-tight leading-8">
              View Card Meanings
            </h5>              
            <p className="text-lg leading-8 text-(--clr-surface-a50)">
            Learn about each tarot card
            </p>                
            </Link>
            <Link
              className="bg-(--clr-surface-tonal-a20) border border-(--clr-surface-tonal-a30) hover:border-(--clr-primary-30) hover:text-(--clr-primary-a30) flex flex-col my-5 justify-center items-center h-full py-20 px-10 rounded-lg text-center text-(--clr-light-a0)"
              href="/spreads/new"
              rel="noopener noreferrer"
            >
              <h5 className="mb-3 text-3xl font-semibold tracking-tight text-heading leading-8">Add New Reading</h5>              
              <p className="text-lg leading-8 text-(--clr-surface-a50)">
              Document your next tarot reading
              </p>               
            </Link>
            <Link
            className="bg-(--clr-surface-tonal-a20) border border-(--clr-surface-tonal-a30) hover:border-(--clr-primary-a30) hover:text-(--clr-primary-a30) flex flex-col my-5 justify-center items-center h-full py-20 px-10 rounded-lg text-center text-(--clr-light-a0)"
            href="/spreads"
            rel="noopener noreferrer"
            >
            <h5 className="mb-3 text-3xl font-semibold tracking-tight text-heading leading-8">See Previous Readings</h5>              
            <p className="text-lg leading-8 text-(--clr-surface-a50)">
            Review and edit your previous readings
            </p>                
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}