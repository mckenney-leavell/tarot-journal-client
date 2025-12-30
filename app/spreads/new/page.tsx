'use client'

import SpreadForm from "@/components/spread/form";
import { createSpread } from "@/data/spreads";
import { useRef } from "react";

export default function NewSpread() {

    const titleEl = useRef("")   
    const interpretationEl = useRef(null)  

    const saveSpread = () => {
        createSpread({
            title: titleEl.current.value,
            interpretation: interpretationEl.current.value
        })
    }

    return (
        <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black ">
                <h1 className="justify-self-center max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 p-4">Add a New Spread</h1>
                <SpreadForm saveSpread={saveSpread} titleEl={titleEl} interpretationEl={interpretationEl} />
            </main>
        </div>
    )
}