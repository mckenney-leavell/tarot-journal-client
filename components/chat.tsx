import { useEffect, useState } from "react";

export function Chat({ spread, cards }) {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);

    useEffect(() => {
        if (spread) {
            const cardNames = cards.map(card => card.card.name)
            console.log("card names:", cardNames)
            const spreadString = `My reading title is ${spread.title} and the cards I pulled are ${cardNames}`
            setInput(spreadString)
        }
    }, [spread, cards])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userMessage = input;

        try {
            const response = await fetch('http://localhost:8000/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessage(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {message.length === 1 ? 
                <div className="block w-full text-lg rounded-md px-5 py-3 bg-(--clr-surface-tonal-a10)">
                    <p>{message[0].content}</p>
                </div> : 
                <button className="flex justify-self-center px-6 py-2 rounded-full mt-4 bg-(--clr-primary-a10) hover:bg-(--clr-primary-a30) text-(--clr-surface-a0) hover:text-(--clr-surface-tonal-a10) text-lg" onClick={handleSubmit}>
                    Generate Interpretation
                </button>
            }
            
        </>
    );
}