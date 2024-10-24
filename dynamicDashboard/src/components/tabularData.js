import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
};
const TableData = ({ data, dateRangeLabels, maxColumns, }) => {
    const [rowData, setRowData] = useState([]);
    const formattedDateLabels = dateRangeLabels
        .slice(0, maxColumns)
        .map(formatDate);
    const systolicReadings = data.find((v) => v.vital === "Systolic Blood Pressure")?.readings || [];
    const diastolicReadings = data.find((v) => v.vital === "Diastolic Blood Pressure")?.readings || [];
    const mergedBpReadings = systolicReadings.map((sys, index) => sys && diastolicReadings[index] ? `${sys}/${diastolicReadings[index]}` : '-');
    const mergedBpData = {
        vital: "Blood Pressure",
        readings: mergedBpReadings,
    };
    const filteredData = data.filter((v) => v.vital !== "Systolic Blood Pressure" && v.vital !== "Diastolic Blood Pressure");
    const updatedData = [mergedBpData, ...filteredData];
    useEffect(() => {
        if (data[0]?.vital.includes("Blood Pressure")) {
            setRowData(updatedData);
        }
        else
            setRowData(data);
    }, [data]);
    const columns = [
        {
            header: "",
            accessor: (item) => (_jsxs("span", { children: [item.vital.includes("Blood Pressure") ? "Blood Pressure" : item.vital, item.vital.includes("Blood Pressure")
                        ? " ( mmHg )"
                        : item.vital === "Heart Rate"
                            ? " ( bpm )"
                            : item.vital === "Weight"
                                ? " ( lbs )"
                                : item.vital === "Glucose"
                                    ? " ( mg/dl )"
                                    : item.vital === "SPO2"
                                        ? " ( % )"
                                        : ""] })),
        },
        ...formattedDateLabels.map((label, i) => ({
            header: label,
            accessor: (item) => item.readings[i] ?? "-",
        })),
    ];
    // console.log("test");
    return (_jsx("div", { className: "overflow-x-auto w-full m-4 custom-scrollbar", children: _jsxs("table", { className: "min-w-full bg-white border", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map((column, index) => (_jsx("th", { className: "px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider", children: column.header }, index))) }) }), _jsx("tbody", { children: rowData.map((item, index) => (_jsx("tr", { children: columns.map((column, colIndex) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap border-b border-gray-200", children: column.accessor(item) ? column.accessor(item) : '-' }, `${index}-${colIndex}`))) }, index))) })] }) }));
};
export default TableData;
