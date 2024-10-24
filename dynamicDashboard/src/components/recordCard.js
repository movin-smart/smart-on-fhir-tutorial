import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import HeartRateIcon from "../assets/heart-rate-icon.svg";
import WeightIcon from "../assets/weight-icon.svg";
import GlucoseIcon from "../assets/glucose.svg";
import BpIcon from "../assets/bp-icon.svg";
import Spo2Icon from "../assets/spo2-icon.svg";
const RecordCard = ({ records }) => {
    const icons = {
        BP: BpIcon,
        HR: HeartRateIcon,
        Glucose: GlucoseIcon,
        Weight: WeightIcon,
        SPO2: Spo2Icon,
    };
    return (_jsx("div", { className: "flex flex-row overflow-x-auto items-center justify-start space-x-2 2xl:space-x-6", children: records.map((record, index) => (_jsxs("div", { className: "px-2 my-3 py-2 bg-slate-50 h-45", style: { minWidth: "210px", width: "230px", borderRadius: "40px" }, children: [_jsxs("div", { className: "flex", children: [_jsx("img", { src: icons[record.type], className: "rounded-full bg-slate-200 w-10 h-10 p-2 2xl:p-3 m-3", alt: record.type }), _jsxs("div", { className: "flex flex-col self-center", children: [_jsx("label", { className: "text-lg font-medium", children: record.type === "Weight" ? "WT" : record.type }), _jsxs("div", { className: "flex space-x-1", children: [_jsx("label", { className: "text-2xl font-medium", children: record.value }), _jsx("label", { className: "text-slate-400 mt-1", children: record.unit })] }), _jsx("div", { className: "flex items-center mt-0.5", children: _jsxs("label", { className: "text-slate-400", children: [record.date, " | ", record.time] }) })] })] }), record.type === "BP" ? (_jsxs("div", { className: "flex flex-col space-y-1", children: [_jsx("div", { id: "seperator", className: "border-t-2 border-gray-100 mt-2" }), _jsxs("div", { className: "flex ml-16 space-x-2", children: [_jsx("p", { className: "text-lg font-medium", children: record.avgValue }), _jsx("label", { className: "text-slate-400 ml-1 mt-1", children: record.unit })] }), _jsx("label", { className: "text-slate-400 ml-16 text-xs", children: "5 days average" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { id: "seperator", className: "border-t-2 border-gray-100 my-2" }), _jsxs("div", { className: "grid grid-cols-2 px-3 items-center", children: [_jsxs("div", { className: "flex space-x-1", children: [_jsx("label", { className: "text-lg font-medium\t", children: record.avgValue }), _jsx("label", { className: "text-slate-400 ml-1 mt-1", children: record.unit })] }), _jsx("div", { className: "flex items-center justify-end", children: _jsx("label", { className: "text-sm font-medium", children: record.type === "HR"
                                            ? "HRV"
                                            : record.type === "Weight"
                                                ? "BMI"
                                                : record.type === "Glucose"
                                                    ? "HbA1c"
                                                    : record.type === "SPO2"
                                                        ? "6MWT"
                                                        : record.test }) }), _jsx("label", { className: "text-slate-400 text-xs", children: "5 days average" }), _jsxs("div", { className: "flex justify-end", children: [_jsx("label", { className: "text-base font-medium", children: record.testValue }), _jsx("label", { className: "text-xs font-medium text-slate-400 pl-1 ", children: record.testUnit })] })] })] }))] }, index))) }));
};
export default React.memo(RecordCard);
