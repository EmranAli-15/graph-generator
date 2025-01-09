import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";


const Graph = () => {
    const [graphHeight, setGraphHeight] = useState(window.innerWidth);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth);

    const [fixedH, setFixedH] = useState(window.innerHeight);
    const [fixedW, setFixedW] = useState(window.innerWidth);

    const [afterZoom, setAfterZoom] = useState(100);

    const [dots, setDots] = useState([]);

    const centerX = graphWidth / 2;
    const centerY = graphHeight / 2;

    const points = dots
        .map(point => `${point.x + centerX},${point.y + centerY}`)
        .join(" ");

    const [myData, setMyData] = useState([]);


    const [xAxis, setXAxis] = useState("");
    const [yAxis, setYAxis] = useState("");

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

    const [graphLines, setGraphLines] = useState([
        40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760
    ])




    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: graphWidth, height: graphHeight });

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
            setFixedH(700);
            setFixedW(700);
            setGraphHeight(700)
            setGraphWidth(700)
            viewBox.width = 700;
            viewBox.height = 700;
        };
        if (window.innerHeight > graphWidth) {
            setFixedH(graphWidth);
            setGraphHeight(graphWidth);
        };
    }, []);


    return (
        <div className="max-w-7xl mx-auto">
            <div className="sm:flex-col md:flex justify-between">
                <section style={{ height: fixedH + "px", width: fixedW + "px" }} className="border overflow-auto">
                    <svg
                        viewBox={`0,0 ${Number(graphWidth)} ${graphHeight}`}
                        height={viewBox.height} width={viewBox.width}
                        style={{ zoom: afterZoom + "%", }}
                    >

                        {/* Middle Line */}
                        <polyline points={`0,${centerY} ${graphWidth},${centerY}`} stroke="black" strokeWidth="2" fill="none" />
                        <polyline points={`${centerX},0 ${centerX},${graphHeight}`} stroke="black" strokeWidth="2" fill="none" />


                        {/* Graph Lines start for X axis */}
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`0,${centerY + line} ${graphWidth},${centerY + line}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`0,${centerY - line} ${graphWidth},${centerY - line}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {/* Graph Lines end for X axis */}




                        {/* Graph Lines start for Y axis */}
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`${centerX + line},0 ${centerX + line},${graphHeight}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {
                            graphLines.map(line => {
                                return <polyline key={line} points={`${centerX - line},0 ${centerX - line},${graphHeight}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
                            })
                        }
                        {/* Graph Lines end for Y axis */}


                        {/* Actual Graph */}
                        <polyline points={points} stroke="blue" strokeWidth="2" fill="none" />


                        {/* Dot For Point */}
                        {
                            dots.map((dot, index) => <circle key={index} r="2" cx={`${centerX + dot.x}`} cy={`${centerY + dot.y}`} fill="red" />)
                        }

                    </svg>
                </section>





                <section className="md:w-1/3 px-2 md:px-0">
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center justify-center gap-x-2">
                            <button onClick={() => handleGraphSize(1.2)}>
                                <AiFillMinusCircle className="size-8 fill-red-600"></AiFillMinusCircle>
                            </button>
                            <span className="py-1 px-3 rounded-md bg-orange-500 text-white">Graph</span>
                            <button onClick={() => handleGraphSize(0.8)}>
                                <AiFillPlusCircle className="size-8 fill-green-600"></AiFillPlusCircle>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-x-2">
                            <button onClick={() => setAfterZoom(afterZoom - 10)}>
                                <AiFillMinusCircle className="size-8 fill-red-600"></AiFillMinusCircle>
                            </button>
                            <span className="py-1 px-3 rounded-md bg-orange-500 text-white">Zoom</span>
                            <button onClick={() => setAfterZoom(afterZoom + 10)}>
                                <AiFillPlusCircle className="size-8 fill-green-600"></AiFillPlusCircle>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end mb-4 mr-[2px] mt-2">
                        <button className="text-sm font-semibold size-7 rounded-full text-center text-white bg-info" onClick={() => setAfterZoom(100)}>
                            100
                        </button>
                    </div>

                    <div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <input value={xAxis} onChange={(e) => setXAxis(Number(e.target.value))} type="number" placeholder="X" className="border text-black outline-none px-2 h-10 rounded-md w-[150px] bg-gray-200" />
                                <input value={yAxis} onChange={(e) => setYAxis(Number(e.target.value))} type="number" placeholder="Y" className="border text-black outline-none px-2 h-10 rounded-md w-[150px] bg-gray-200" />
                            </div>
                        </div>

                        <div className="flex justify-center gap-x-3">
                            <button onClick={handleBack} className="btn btn-sm text-white border-0 bg-orange-500">Back</button>
                            <button onClick={handleNewData} className="btn btn-sm text-white border-0 btn-info">Add</button>
                        </div>
                    </div>


                    <div className="mt-8">
                        <div className="text-center text-gray-500">
                            <em>each square 10 unit</em>
                        </div>
                        <table className="w-full">
                            <tbody>
                                <tr className="flex justify-between text-orange-500">
                                    <th className="border w-full">X</th>
                                    <th className="border w-full">Y</th>
                                </tr>
                                {
                                    myData.map((obj, index) => {
                                        return <tr key={index} className={`${index & 1 && "bg-slate-100"} flex justify-between`}>
                                            <td className="border w-full px-2 text-green-600 font-semibold">{obj.x}</td>
                                            <td className="border w-full px-2 text-green-600 font-semibold">{-(obj.y)}</td>
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