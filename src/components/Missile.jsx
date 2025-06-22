import React from "react";

const Missile = ({ missile }) => {
  // missile = { id, x, y, speed }
  return (
    <div className="bg-red-700 text-white p-2 rounded shadow-md w-48 my-2">
      <h3 className="font-bold text-lg mb-1">Enemy Missile</h3>
      <p>
        <span className="font-semibold">ID:</span> {missile.id}
      </p>
      <p>
        <span className="font-semibold">Position:</span> ({missile.x.toFixed(1)}, {missile.y.toFixed(1)})
      </p>
      <p>
        <span className="font-semibold">Speed:</span> {missile.speed.toFixed(2)} px/frame
      </p>
    </div>
  );
};

export default Missile;
