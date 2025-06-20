import { useEffect, useState } from "react";
import { BsDash, BsPlusLg } from "react-icons/bs";
import AiAssistant from "./AiAssistant";


const Graph = () => {
    const [graphHeight, setGraphHeight] = useState(window.innerWidth);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth);

    const [fixedH, setFixedH] = useState(window.innerHeight);
    const [fixedW, setFixedW] = useState(window.innerWidth);

    const [afterZoom, setAfterZoom] = useState(100);
    const [fill, setFill] = useState(true);

    const [xAxis, setXAxis] = useState("");
    const [yAxis, setYAxis] = useState("");

    const [myData, setMyData] = useState([]);
    const [graphLines, setGraphLines] = useState([
        40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760
    ])

    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: graphWidth, height: graphHeight });
    const [dots, setDots] = useState([]);

    const centerX = graphWidth / 2;
    const centerY = graphHeight / 2;

    const points = dots
        .map(point => `${point.x + centerX},${point.y + centerY}`)
        .join(" ");



    const handleNewData = () => {
        const obj = { x: 4 * xAxis, y: 4 * (0 - yAxis) };
        setDots([...dots, obj]);

        const myObj = { x: (0 + xAxis), y: (0 - yAxis) };
        setMyData([...myData, myObj])
        setXAxis("");
        setYAxis("");
    };

    const handleBack = () => {
        const oldArr = [...dots];
        oldArr.pop();
        setDots(oldArr);

        const myOldArr = [...myData]
        myOldArr.pop();
        setMyData(myOldArr)
    };



    // Function to handle zooming
    const handleGraphSize = (scaleFactor) => {
        if (scaleFactor > 1) {
            const newWidth = viewBox.width - 40;
            const newHeight = viewBox.height - 40;

            setGraphHeight((graphHeight) => graphHeight - 40)
            setGraphWidth((graphWidth) => graphWidth - 40)

            setViewBox({
                width: newWidth,
                height: newHeight,
            });
        } else {
            const newWidth = viewBox.width + 40;
            const newHeight = viewBox.height + 40;

            setGraphHeight((graphHeight) => graphHeight + 40)
            setGraphWidth((graphWidth) => graphWidth + 40)

            if ((graphWidth / 2) > graphLines[graphLines.length - 1]) {
                const newLine = (graphLines[graphLines.length - 1]) + 40;
                setGraphLines([...graphLines, newLine])
            }

            setViewBox({
                width: newWidth,
                height: newHeight,
            });
        }
    };


    // Setting graph size
    useEffect(() => {
        if (window.innerWidth > 500) {
            setFixedH(window.innerHeight);
            setFixedW(window.innerWidth - (window.innerWidth / 3));
            setGraphHeight(window.innerHeight)
            setGraphWidth(window.innerWidth - (window.innerWidth / 3))
            viewBox.width = window.innerWidth - (window.innerWidth / 3);
            viewBox.height = window.innerHeight;
        };
        if (window.innerHeight > graphWidth) {
            setFixedH(graphWidth);
            setGraphHeight(graphWidth);
        };
    }, []);


    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between gap-x-4">

                {/* style={{ height: fixedH + "px", width: fixedW + "px" }} */}
                <section style={{ height: fixedH + "px", width: fixedW + "px" }} className="border overflow-auto md:w-2/3">
                    <svg
                        viewBox={`0,0 ${Number(graphWidth)} ${graphHeight}`}
                        height={viewBox.height} width={viewBox.width}
                        style={{ zoom: afterZoom + "%", }}
                    >




                        {/* Graph Lines start for X axis */}
                        {
                            graphLines.map(line => {
                                const x = line % 80;
                                return <polyline key={line} points={`0,${centerY + line} ${graphWidth},${centerY + line}`} stroke={!x ? "#C0C0C0" : "#819A91"} strokeWidth="1" fill="none" />
                            })
                        }
                        {
                            graphLines.map(line => {
                                const x = line % 80;
                                return <polyline key={line} points={`0,${centerY - line} ${graphWidth},${centerY - line}`} stroke={!x ? "#C0C0C0" : "#819A91"} strokeWidth="1" fill="none" />
                            })
                        }
                        {/* Graph Lines end for X axis */}




                        {/* Graph Lines start for Y axis */}
                        {
                            graphLines.map(line => {
                                const x = line % 80;
                                return <polyline key={line} points={`${centerX + line},0 ${centerX + line},${graphHeight}`} stroke={!x ? "#C0C0C0" : "#819A91"} strokeWidth="1" fill="none" />
                            })
                        }
                        {
                            graphLines.map(line => {
                                const x = line % 80;
                                return <polyline key={line} points={`${centerX - line},0 ${centerX - line},${graphHeight}`} stroke={!x ? "#C0C0C0" : "#819A91"} strokeWidth="1" fill="none" />
                            })
                        }
                        {/* Graph Lines end for Y axis */}



                        {/* Middle Line */}
                        <polyline points={`0,${centerY} ${graphWidth},${centerY}`} stroke="#f97316" strokeWidth="2" fill="none" />
                        <polyline points={`${centerX},0 ${centerX},${graphHeight}`} stroke="#f97316" strokeWidth="2" fill="none" />


                        {/* Actual Graph */}
                        <polyline points={points} stroke="#F6DC43" strokeWidth="2" fill={fill ? "#00000060" : "none"} />


                        {/* Dot For Point */}
                        {
                            dots.map((dot, index) => <circle key={index} r="2" cx={`${centerX + dot.x}`} cy={`${centerY + dot.y}`} fill="red" />)
                        }

                    </svg>
                </section>





                <section className="md:w-1/3 p-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-5">
                        <div className="flex items-center justify-center text-white">
                            <button
                                className="btnLeft"
                                onClick={() => handleGraphSize(1.2)}>
                                <BsDash />
                            </button>
                            <span className="py-2 px-3 border border-[#00b6ff]">Graph</span>
                            <button
                                className="btnRight"
                                onClick={() => handleGraphSize(0.8)}>
                                <BsPlusLg />
                            </button>
                        </div>

                        <div className="flex items-center justify-center text-white">
                            <button
                                className="btnLeft"
                                onClick={() => setAfterZoom(afterZoom - 10)}>
                                <BsDash />
                            </button>
                            <span className="py-2 px-3 border border-[#00b6ff]">Zoom</span>
                            <button
                                className="btnRight"
                                onClick={() => setAfterZoom(afterZoom + 10)}>
                                <BsPlusLg />
                            </button>
                        </div>


                        <div>
                            <button className={`${fill && 'bg-[#00000060]'} myBtn w-[120px]`} onClick={() => setFill(!fill)}>
                                {fill ? "Filled" : "Unfilled"}
                            </button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div>
                            <div className="flex justify-between mb-2 gap-x-2">
                                <input value={xAxis} onChange={(e) => setXAxis(Number(e.target.value))} type="number" placeholder="X" className="border text-black outline-none px-2 h-11 rounded-sm w-full bg-white" />
                                <input value={yAxis} onChange={(e) => setYAxis(Number(e.target.value))} type="number" placeholder="Y" className="border text-black outline-none px-2 h-11 rounded-sm w-full bg-white" />
                            </div>
                        </div>

                        <div className="flex justify-between gap-x-2 mt-5">
                            <button onClick={handleBack} className="myBtn">Back</button>
                            <button onClick={handleNewData} className="myBtn bg-[#00b6ff]">Add</button>
                        </div>
                    </div>

                    {/* Ai part */}
                    <div className="my-5">
                        <AiAssistant setDots={setDots}></AiAssistant>
                    </div>


                    <div className="mt-10">
                        <div className="text-center text-white">
                            <em>each square 10 unit</em>
                        </div>
                        <table className="w-full">
                            <tbody>
                                <tr className="flex justify-between text-xl text-[#00b6ff]">
                                    <th className="border w-full">X</th>
                                    <th className="border w-full">Y</th>
                                </tr>
                                {
                                    myData.map((obj, index) => {
                                        return <tr key={index} className={`${index & 1 && "bg-[#00000060]"} flex justify-between`}>
                                            <td className="border border-t-0 w-full px-2 text-xl text-white font-semibold">{obj.x}</td>
                                            <td className="border border-t-0 w-full px-2 text-xl text-white font-semibold">{-(obj.y)}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Graph;