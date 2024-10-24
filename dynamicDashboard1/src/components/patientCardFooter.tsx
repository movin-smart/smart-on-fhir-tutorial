import React from "react";
import {STATUS_ITEMS as statusItems} from "../utils/index"

interface PatientFooterProps {
  gridCount?: number;
}

const PatientFooter: React.FC<PatientFooterProps> = ({
  gridCount,
}) => {
  return (
    <div
      className={`lg:flex justify-around lg:justify-start ${
        gridCount === 2 ? "xl:block" : "xl:flex"
      }`}
    >
      <div
        className={`grid grid-cols-4 md:grid-cols-5 gap-1 justify-center items-center mx-2 my-2`}
      >
        {statusItems.map((item, index) => (
          <div
            key={index}
            className={`${
              index === 4 ? "col-span-4 md:col-span-1" : "col-span-2"
            } md:col-span-1 border-2 py-3 lg:px-2 rounded-full border-gray-100`}
          >
            <div className="flex justify-center items-center">
              <label className="bg-blue-600 rounded-full text-white py-0.5 px-1 w-6 h-6 flex justify-center items-center">
                {item.value}
              </label>
              <label className="ml-1">{item.label}</label>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:flex justify-center items-center">
        <label className="bg-green-500 rounded-full text-white px-3 py-1 font-bold">
          RPM
        </label>
        <label className="bg-blue-600 rounded-full text-white px-3 py-1 ml-3 font-bold">
          CCM
        </label>
      </div>
    </div>
  );
};

export default PatientFooter;