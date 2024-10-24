import React from "react";
import { vitalOptions } from "../utils";

interface FilterModalProps {
  showFilterOptions: boolean;
  setShowFilterOptions: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVital: string | null;
  handleVitalChange: (option: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  showFilterOptions,
  setShowFilterOptions,
  selectedVital,
  handleVitalChange,
}) => {
  if (!showFilterOptions) return null;

  return (
    <>
      {" "}
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={() => setShowFilterOptions(false)}
      ></div>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex justify-center items-end shadow-lg">
        <div className="bg-white w-full p-6 rounded-t-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-medium">Filter</h1>
            <button
              className="text-gray-600"
              onClick={() => setShowFilterOptions(false)}
            >
              X
            </button>
          </div>
          <div>
            <h2 className="text-sm font-medium mb-2">Detail data</h2>
            <ul className="space-y-2">
              {vitalOptions.map((vital) => (
                <li key={vital} className="flex items-center">
                  <input
                    type="checkbox"
                    id={vital}
                    checked={selectedVital === vital}
                    onChange={() => handleVitalChange(vital)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={vital} className="ml-2 text-sm text-gray-700">
                    {vital}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-full"
              onClick={() => setShowFilterOptions(false)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;