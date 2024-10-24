import React from "react";
import HeartRateIcon from "../assets/heart-rate-icon.svg";
import WeightIcon from "../assets/weight-icon.svg";
import GlucoseIcon from "../assets/glucose.svg";
import BpIcon from "../assets/bp-icon.svg";
import Spo2Icon from "../assets/spo2-icon.svg";

interface Record {
  type: string;
  value: string;
  date: string;
  time: string;
  avgValue: string;
  unit: string;
  test?: string;
  testValue?: string;
  testUnit?: string;
}

interface RecordCardProps {
  records: Record[];
}

const RecordCard: React.FC<RecordCardProps> = ({ records }) => {
  const icons: { [key: string]: string } = {
    BP: BpIcon,
    HR: HeartRateIcon,
    Glucose: GlucoseIcon,
    Weight: WeightIcon,
    SPO2: Spo2Icon,
  };

  
  return (
    <div className="flex flex-row overflow-x-auto items-center justify-start space-x-2 2xl:space-x-6">
      {records.map((record, index) => (
        <div
          key={index}
          className="px-2 my-3 py-2 bg-slate-50 h-45"
          style={{ minWidth: "210px", width: "230px", borderRadius: "40px" }}
        >
          <div className="flex">
          <img src={icons[record.type]} className="rounded-full bg-slate-200 w-10 h-10 p-2 2xl:p-3 m-3" alt={record.type} />

            <div className="flex flex-col self-center">
              <label className="text-lg font-medium">
                {record.type === "Weight" ? "WT" : record.type}
              </label>
              <div className="flex space-x-1">
                <label className="text-2xl font-medium">{record.value}</label>
                <label className="text-slate-400 mt-1">{record.unit}</label>
              </div>
              <div className="flex items-center mt-0.5">
                <label className="text-slate-400">
                  {record.date} | {record.time}
                </label>
              </div>
            </div>
          </div>
          {record.type === "BP" ? (
            <div className="flex flex-col space-y-1">
              <div
                id="seperator"
                className="border-t-2 border-gray-100 mt-2"
              ></div>
              <div className="flex ml-16 space-x-2">
                <p className="text-lg font-medium">{record.avgValue}</p>
                <label className="text-slate-400 ml-1 mt-1">
                  {record.unit}
                </label>
              </div>
              <label className="text-slate-400 ml-16 text-xs">
                5 days average
              </label>
            </div>
          ) : (
            <>
              <div
                id="seperator"
                className="border-t-2 border-gray-100 my-2"
              ></div>

              <div className="grid grid-cols-2 px-3 items-center">
                <div className="flex space-x-1">
                  <label className="text-lg font-medium	">{record.avgValue}</label>
                  <label className="text-slate-400 ml-1 mt-1">
                    {record.unit}
                  </label>
                </div>
                <div className="flex items-center justify-end">
                  <label className="text-sm font-medium">
                    {record.type === "HR"
                      ? "HRV"
                      : record.type === "Weight"
                      ? "BMI"
                      : record.type === "Glucose"
                      ? "HbA1c"
                      : record.type === "SPO2"
                      ? "6MWT"
                      : record.test}
                  </label>
                </div>
                <label className="text-slate-400 text-xs">5 days average</label>
                <div className="flex justify-end">
                  <label className="text-base font-medium">
                    {record.testValue}
                  </label>
                  <label className="text-xs font-medium text-slate-400 pl-1 ">
                    {record.testUnit}
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default React.memo(RecordCard);

