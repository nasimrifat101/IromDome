import React from "react";
import Missile from "./Missile";
import Interceptor from "./Interceptor";

const ControlPanel = ({
  missiles,
  interceptors,
  onLaunchInterceptor,
}) => {
  return (
    <div className="p-4 bg-gray-900 text-green-400 rounded-lg shadow-lg w-80 max-h-[600px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>

      <button
        onClick={onLaunchInterceptor}
        className="mb-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Launch Interceptor
      </button>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">
          Active Missiles ({missiles.length})
        </h3>
        {missiles.length === 0 ? (
          <p className="italic text-gray-400">No missiles detected</p>
        ) : (
          missiles.map((missile) => <Missile key={missile.id} missile={missile} />)
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">
          Active Interceptors ({interceptors.length})
        </h3>
        {interceptors.length === 0 ? (
          <p className="italic text-gray-400">No interceptors launched</p>
        ) : (
          interceptors.map((interceptor) => (
            <Interceptor key={interceptor.id} interceptor={interceptor} />
          ))
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
