import { useEffect, useState } from "react";

const App = () => {
  const [h, setH] = useState(800);
  const [w, setW] = useState(800);

  const customWidth = window.innerWidth;
  useEffect(() => {
    if (customWidth < 450) {
      // setW(customWidth);
      // setH(customWidth);
    }
  })

  const [data, setData] = useState([]);

  const centerX = w / 2;
  const centerY = h / 2;

  const points = data
    .map(point => `${point.x + centerX},${point.y + centerY}`)
    .join(" ");

  const [myData, setMyData] = useState([])


  const [xS, setXs] = useState("");
  const [yS, setYs] = useState("");

  const handleNewData = () => {
    const obj = { x: 4 * xS, y: 4 * (0 - yS) };
    setData([...data, obj]);

    const myObj = { x: (0 + xS), y: (0 - yS) };
    setMyData([...myData, myObj])
    setXs("");
    setYs("");
  };

  const handleBack = () => {
    const oldArr = [...data];
    oldArr.pop();
    setData(oldArr);

    const myOldArr = [...myData]
    myOldArr.pop();
    setMyData(myOldArr)
  };


  return (
    <div className="min-h-[100vh]">
      <div className="md:flex md:justify-between m-5">
        <div className="h-[500px] md:h-full overflow-x-auto overflow-y-auto">
          <svg width={w} height={h} className="border">

            {/* Middle Line */}
            <polyline points={`0,${centerY} ${w},${centerY}`} stroke="black" strokeWidth="2" fill="none" />
            <polyline points={`${centerX},0 ${centerX},${h}`} stroke="black" strokeWidth="2" fill="none" />


            {/* Graph Line */}
            <polyline points={`0,${40} ${w},${40}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${80} ${w},${80}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${120} ${w},${120}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${160} ${w},${160}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${200} ${w},${200}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${240} ${w},${240}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${280} ${w},${280}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${320} ${w},${320}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${360} ${w},${360}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${440} ${w},${440}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${480} ${w},${480}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${520} ${w},${520}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${560} ${w},${560}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${600} ${w},${600}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${640} ${w},${640}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${680} ${w},${680}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${720} ${w},${720}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`0,${760} ${w},${760}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />

            <polyline points={`${40},0 ${40},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${80},0 ${80},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${120},0 ${120},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${160},0 ${160},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${200},0 ${200},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${240},0 ${240},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${280},0 ${280},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${320},0 ${320},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${360},0 ${360},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${440},0 ${440},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${480},0 ${480},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${520},0 ${520},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${560},0 ${560},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${600},0 ${600},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${640},0 ${640},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${680},0 ${680},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${720},0 ${720},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />
            <polyline points={`${760},0 ${760},${h}`} stroke="#C0C0C0" strokeWidth="1" fill="none" />


            {/* Actual Graph */}
            <polyline points={points} stroke="blue" strokeWidth="2" fill="none" />


            {/* Dot For Point */}
            {
              data.map((dot, index) => <circle key={index} r="2" cx={`${centerX + dot.x}`} cy={`${centerY + dot.y}`} fill="red" />)
            }

          </svg>
        </div>

        <div className="mt-10 px-3 md:mt-0 md:px-0">
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

export default App;