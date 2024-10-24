import React from 'react';

interface GridToggleProps {
  gridCount: number;
  setGridCount: (count: number) => void;
}

const GridToggle: React.FC<GridToggleProps> = ({ gridCount, setGridCount }) => (
  <div className="hidden xl:flex justify-end mt-3 mr-4">
    <button
      onClick={() => setGridCount(1)}
      className={`mx-1 border-b-2 ${gridCount === 1 ? "border-blue-600" : "border-white"}`}
    >
      <div className={`border-2 my-1 bg-white rounded w-5 h-5 ${gridCount === 1 ? "border-blue-600" : "border-white"}`}></div>
    </button>
    <button
      onClick={() => setGridCount(2)}
      className={`mx-1 border-b-2 ${gridCount === 2 ? "border-blue-600" : "border-white"}`}
    >
      <div className="flex space-x-1 my-1">
        <div className={`border-2 bg-white rounded w-5 h-5 ${gridCount === 2 ? "border-blue-600" : "border-white"}`}></div>
        <div className={`border-2 bg-white rounded w-5 h-5 ${gridCount === 2 ? "border-blue-600" : "border-white"}`}></div>
      </div>
    </button>
  </div>
);

export default GridToggle;