import React from "react";

const Interceptor = ({ interceptor }) => {
  // interceptor = { id, x, y, speed }
  return (
    <div className="bg-blue-700 text-white p-2 rounded shadow-md w-48 my-2">
      <h3 className="font-bold text-lg mb-1">Interceptor Missile</h3>
      <p>
        <span className="font-semibold">ID:</span> {interceptor.id}
      </p>
      <p>
        <span className="font-semibold">Position:</span> ({interceptor.x.toFixed(1)}, {interceptor.y.toFixed(1)})
      </p>
      <p>
        <span className="font-semibold">Speed:</span> {interceptor.speed.toFixed(2)} px/frame
      </p>
    </div>
  );
};

export default Interceptor;
