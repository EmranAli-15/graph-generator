import React, { useEffect, useRef, useState } from 'react'

export default function Test() {



    const [divWidth, setDivWidth] = useState(300); // Initial width of the div
    const divRef = useRef(null);

    // Function to increase the width of the div
    const increaseWidth = () => {
        setDivWidth((prevWidth) => prevWidth + 300); // Increment width by 300px
    };

    useEffect(() => {
        if (divRef.current) {
            const div = divRef.current;

            // Automatically scroll to the rightmost side when the width increases
            div.scrollTo({
                left: div.scrollWidth/2, // Scroll to the end of the horizontal scroll
                behavior: "smooth", // Smooth scrolling for better UX
            });
        }
    }, [divWidth]);



    return (
        <div>
            <button
                onClick={increaseWidth}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Increase Width
            </button>
            <div
                ref={divRef}
                className="overflow-x-auto overflow-y-auto h-[300px] border border-gray-300"
                style={{ width: "100%" }}
            >
                <div
                    className="h-[300px] bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${divWidth}px` }}
                >
                    <span className="text-white text-2xl font-bold flex justify-center items-center h-full">
                        Scrollable Content
                    </span>
                </div>
            </div>
            <div>
                EMRAN
            </div>
        </div>
    )
}
