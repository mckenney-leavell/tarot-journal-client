'use client'

import SpreadForm from "@/components/spread/form"
import { getSpreadById, updateSpread } from "@/data/spreads";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface Spread {
    id?: number
    title?: string
    interpretation?: string
    ai_interpretation?: string
    spread_cards?: unknown[]
}

export default function EditSpread({ params }) {
    const paramString = React.use(params)
    const id = paramString.id
    const [spread, setSpread] = useState<Spread>({})
    const [toggleRequiredFieldMsg, setToggleRequiredFieldMsg] = useState(false)
    const titleEl = useRef<HTMLInputElement>(null)
    const interpretationEl = useRef<HTMLTextAreaElement>(null)
    const aiInterpretationEl = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (id) {
            getSpreadById(id).then(spreadObj => {
                setSpread(spreadObj)
            })
        }
    }, [id])

    useEffect(() => {
        if (!titleEl.current || !interpretationEl.current || !aiInterpretationEl.current) return
        titleEl.current.value = spread.title ?? ''
        interpretationEl.current.value = spread.interpretation ?? ''
        aiInterpretationEl.current.value = spread.ai_interpretation ?? ''
    }, [spread])

    const saveSpread = () => {
        if (!titleEl.current || !interpretationEl.current || !aiInterpretationEl.current) return
        if (titleEl.current.value === " " || titleEl.current.value === "") {
            setToggleRequiredFieldMsg(true)
            return console.log("No title added")
        } else {
            updateSpread(id, {
                title: titleEl.current.value,
                interpretation: interpretationEl.current.value,
                ai_interpretation: aiInterpretationEl.current.value
            })
            .then(router.push('/spreads'))
        }
    }

    return (
        <>
            <div className="min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
                <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16">
                    <h1 className="justify-self-center max-w-xs text-3xl font-bold leading-10 tracking-tight p-4 text-(--clr-light-a0)">Edit Spread</h1>
                    <SpreadForm saveSpread={saveSpread} titleEl={titleEl} interpretationEl={interpretationEl} aiInterpretationEl={aiInterpretationEl} spread={spread} toggleFieldMsg={toggleRequiredFieldMsg} />
                </main>
            </div>
        </>
    )
}