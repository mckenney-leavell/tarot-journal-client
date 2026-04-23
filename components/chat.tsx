import { useEffect, useState } from "react";

export function Chat({ spread, cards, aiInterpretationEl }) {
    const [input, setInput] = useState('');
    const [hasGenerated, setHasGenerated] = useState(false);

    useEffect(() => {
        if (spread) {
            const cardNames = cards.map(card => card.card.name)
            const spreadString = `My reading title is ${spread.title} and the cards I pulled are ${cardNames}`
            setInput(spreadString)
        }
    }, [spread, cards])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/chat/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            if (aiInterpretationEl?.current) {
                aiInterpretationEl.current.value = data.reply;
            }
            setHasGenerated(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {hasGenerated ? null :
                <button className="flex justify-self-center px-6 py-2 rounded-full mt-4 bg-(--clr-primary-a10) hover:bg-(--clr-primary-a30) text-(--clr-surface-a0) hover:text-(--clr-surface-tonal-a10) text-lg" onClick={handleSubmit}>
                    Generate Interpretation
                </button>
            }
        </>
    );
}
