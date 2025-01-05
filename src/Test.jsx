import React, { useState } from "react";

const GraphGenerator = () => {
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 100, height: 100 });

  // Function to handle zooming
  const zoom = (scaleFactor) => {
    const newWidth = viewBox.width / scaleFactor;
    const newHeight = viewBox.height / scaleFactor;
    const newX = viewBox.x - (newWidth - viewBox.width) / 2;
    const newY = viewBox.y - (newHeight - viewBox.height) / 2;

    setViewBox({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Graph Generator</h2>

      {/* Scrollable Container */}
      <div
        style={{
          width: "500px",
          height: "500px",
          border: "1px solid black",
          overflow: "scroll",
          margin: "0 auto",
        }}
      >
        <svg
          width="2000" // Large enough to ensure the graph is fully visible
          height="2000"
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        >
          {/* Example Axis */}
          <line x1="0" y1="100" x2="200" y2="100" stroke="gray" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="gray" strokeWidth="1" />

          {/* Example Graph Line */}
          <path
            d="M 10 180 C 50 150, 90 50, 190 10" // Ensure the path fits into the graph
            stroke="blue"
            fill="transparent"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => zoom(1.2)}>Zoom In</button>
        <button onClick={() => zoom(1 / 1.2)} style={{ marginLeft: "10px" }}>
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default GraphGenerator;
