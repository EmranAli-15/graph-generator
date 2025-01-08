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
        <div>
            <div className="lg:flex justify-evenly">
                <div style={{ height: fixedH + "px", width: fixedW + "px" }} className="border overflow-auto">
                    <svg
                        viewBox={`0,0 ${Number(graphWidth)} ${graphHeight}`}
                        height={viewBox.height} width={viewBox.width}
                        style={{ scale: afterZoom + "%" }}
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
                </div>





                <div>
                    <div className="flex items-center justify-evenly">
                        <div className="flex items-center justify-center gap-x-2 my-4">
                            <button onClick={() => handleGraphSize(1.2)}>
                                <AiFillMinusCircle className="size-8"></AiFillMinusCircle>
                            </button>
                            <span className="py-1 px-3 rounded-md bg-red-500 text-white">Graph Size</span>
                            <button onClick={() => handleGraphSize(0.8)}>
                                <AiFillPlusCircle className="size-8"></AiFillPlusCircle>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-x-2 my-4">
                            <button onClick={() => setAfterZoom(afterZoom - 10)}>
                                <AiFillMinusCircle className="size-8"></AiFillMinusCircle>
                            </button>
                            <span className="py-1 px-3 rounded-md bg-red-500 text-white">Zoom</span>
                            <button onClick={() => setAfterZoom(afterZoom + 10)}>
                                <AiFillPlusCircle className="size-8"></AiFillPlusCircle>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="flex justify-evenly mb-2">
                                <input value={xAxis} onChange={(e) => setXAxis(Number(e.target.value))} type="number" placeholder="X" className="border outline-none px-2 h-10 rounded-md w-[150px]" />
                                <input value={yAxis} onChange={(e) => setYAxis(Number(e.target.value))} type="number" placeholder="Y" className="border outline-none px-2 h-10 rounded-md w-[150px]" />
                            </div>
                        </div>

                        <div className="flex justify-center gap-x-3">
                            <button onClick={handleBack} className="btn btn-sm btn-outline btn-warning">back</button>
                            <button onClick={handleNewData} className="btn btn-sm btn-info">Add</button>
                        </div>
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