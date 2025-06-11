import { useEffect, useState } from 'react'

export default function AiAssistant({ setDots }) {

    const [equation, setEquation] = useState("");
    const [resData, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFn = () => {
        if (!equation) return;

        setLoading(true);

        fetch(`https://graphgenerator-server.vercel.app/ai/${equation}`, {
            method: "POST",
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
            .then(res => res.json())
            .then(data => {
                const rawText = data.candidates[0].content.parts[0].text;
                const jsonText = rawText.replace(/```json|```/g, '').trim();
                setData(JSON.parse(jsonText));
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            });
    };

    useEffect(() => {
        const r = resData.map((poi => {
            return ({
                x: poi.x * 20,
                y: poi.y * -20
            })
        }))

        setDots(r);
    }, [resData])

    return (
        <div>
            <input
                className='border text-black outline-none px-2 h-11 rounded-sm w-full bg-white'
                type="text"
                onChange={(e) => setEquation(e.target.value)}
                value={equation}
                placeholder='e.g.  y = 2x+7'
            />
            <button onClick={handleFn} className='myBtn mt-1'>
                {
                    loading ? "..." : "Draw"
                }
            </button>
        </div>
    )
}
