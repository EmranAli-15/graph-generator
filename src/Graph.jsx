import { useEffect, useRef, useState } from "react";

const Graph = () => {
    const divRef = useRef(null);
    const [isZoom, setIsZoom] = useState(false);

    const [h, setH] = useState(window.innerHeight);
    const [w, setW] = useState(window.innerWidth);

    const [fixedH, setFixedH] = useState(window.innerHeight);
    const [fixedW, setFixedW] = useState(window.innerWidth);

    const [dots, setDots] = useState([]);

    const centerX = w / 2;
    const centerY = h / 2;

    const points = dots
        .map(point => `${point.x + centerX},${point.y + centerY}`)
        .join(" ");

    const [myData, setMyData] = useState([])


    const [xS, setXs] = useState("");
    const [yS, setYs] = useState("");

    const handleNewData = () => {
        const obj = { x: 4 * xS, y: 4 * (0 - yS) };
        setDots([...dots, obj]);

        const myObj = { x: (0 + xS), y: (0 - yS) };
        setMyData([...myData, myObj])
        setXs("");
        setYs("");
        if (xS * 4 > w / 2) {
            setW((w) => w + xS * 4);
        }
        if (yS * 4 > h / 2) {
            setH((h) => h + yS * 4);
        }

    };

    const handleBack = () => {
        const oldArr = [...dots];
        oldArr.pop();
        setDots(oldArr);

        const myOldArr = [...myData]
        myOldArr.pop();
        setMyData(myOldArr)
    };

    const graphLines = [
        40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760
    ];



    // Graph zoom in out
    const handleZoomEvent = () => {
        setIsZoom(!isZoom);
    }


    // Setting graph size
    useEffect(() => {
        if (window.innerWidth > 500) {
            setFixedH(700);
            setFixedW(700);
            setH(700)
            setW(700)
        };
        if (window.innerHeight > w) {
            setFixedH(w);
            setH(w);
        };
    }, []);


    // Auto scrolling
    useEffect(() => {
        if (divRef.current) {
            const div = divRef.current;

            div.scrollTo({
                left: div.scrollWidth / 4,
                top: div.scrollWidth / 4,
                behavior: "smooth",
            });
        }
    }, [w, h]);

    return (
        <div>
            <div className="md:flex">

                <div ref={divRef} style={{ height: fixedH + "px", width: fixedW + "px" }} className="overflow-auto ">
                    <svg style={{ width: w + "px", height: h + "px" }} className={`${isZoom && "scale-[40%] transition-all"} border`}>

                        {/* Middle Line */}
                        <polyline points={`0,${centerY} ${w},${centerY}`} stroke="black" strokeWidth="2" fill="none" />
                        <polyline points={`${centerX},0 ${centerX},${h}`} stroke="black" strokeWidth="2" fill="none" />


                        {/* Graph Lines start for X axis */}
                        {/* Graph Lines start for X axis */}
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`0,${centerY + line} ${w},${centerY + line}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`0,${centerY - line} ${w},${centerY - line}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {/* Graph Lines end for X axis */}
                        {/* Graph Lines end for X axis */}




                        {/* Graph Lines start for Y axis */}
                        {/* Graph Lines start for Y axis */}
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`${centerX + line},0 ${centerX + line},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`${centerX - line},0 ${centerX - line},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {/* Graph Lines end for Y axis */}
                        {/* Graph Lines end for Y axis */}


                        {/* Actual Graph */}
                        <polyline points={points} stroke="blue" strokeWidth="2" fill="none" />


                        {/* Dot For Point */}
                        {
                            dots.map((dot, index) => <circle key={index} r="2" cx={`${centerX + dot.x}`} cy={`${centerY + dot.y}`} fill="red" />)
                        }

                    </svg>
                </div>





                <div>
                    <div className="flex items-center justify-center my-5">
                        <button onClick={handleZoomEvent} className="btn btn-sm btn-info">
                            {isZoom && "+"}
                            {!isZoom && "-"}
                        </button>
                    </div>

                    <div>
                        <div className="flex justify-evenly mb-2">
                            <input value={xS} onChange={(e) => setXs(Number(e.target.value))} type="number" placeholder="X" className="border outline-none px-2 h-10 rounded-md w-[150px]" />
                            <input value={yS} onChange={(e) => setYs(Number(e.target.value))} type="number" placeholder="Y" className="border outline-none px-2 h-10 rounded-md w-[150px]" />
                        </div>
                    </div>

                    <div className="flex justify-center gap-x-3">
                        <button onClick={handleBack} className="btn btn-sm btn-outline btn-warning">back</button>
                        <button onClick={handleNewData} className="btn btn-sm btn-info">Add</button>
                    </div>


                    {
                        myData.map((obj, index) => {
                            return <div key={index} className="flex gap-x-8">
                                <p className="text-blue-600">X: {obj.x}</p>
                                <p className="text-green-600">Y: {-(obj.y)}</p>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default Graph;