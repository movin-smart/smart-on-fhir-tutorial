import React, { useEffect, useState } from "react";

type VitalData = {
  vital: string;
  readings: (number | string)[];
};

type TableColumn<T> = {
  header: string;
  accessor: (item: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  dateRangeLabels: string[];
  maxColumns: number;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const TableData = <T extends VitalData>({
  data,
  dateRangeLabels,
  maxColumns,
}: TableProps<T>) => {
  const [rowData, setRowData] = useState<VitalData[]>([]);
  const formattedDateLabels = dateRangeLabels
    .slice(0, maxColumns)
    .map(formatDate);

  const systolicReadings = (data.find(
    (v) => v.vital === "Systolic Blood Pressure"
  )?.readings as number[]) || [];

  const diastolicReadings = (data.find(
    (v) => v.vital === "Diastolic Blood Pressure"
  )?.readings as number[]) || [];

  const mergedBpReadings = systolicReadings.map(
   (sys, index) => sys && diastolicReadings[index]  ? `${sys}/${diastolicReadings[index]}` : '-'
  );

  const mergedBpData: VitalData = {
    vital: "Blood Pressure",
    readings: mergedBpReadings,
  };

  const filteredData = data.filter(
    (v) => v.vital !== "Systolic Blood Pressure" && v.vital !== "Diastolic Blood Pressure"
  );

  const updatedData = [mergedBpData, ...filteredData];
  useEffect(()=> {
    if(data[0]?.vital.includes("Blood Pressure") ) {
      setRowData(updatedData)
    }
    else setRowData(data)
},[data])

  const columns: TableColumn<VitalData>[] = [
    {
      header: "",
      accessor: (item) => (
        <span>
          {item.vital.includes("Blood Pressure") ? "Blood Pressure" : item.vital} 
          {item.vital.includes("Blood Pressure")
            ? " ( mmHg )"
            : item.vital === "Heart Rate"
            ? " ( bpm )"
            : item.vital === "Weight"
            ? " ( lbs )"
            : item.vital === "Glucose"
            ? " ( mg/dl )"
            : item.vital === "SPO2"
            ? " ( % )"
            : ""}
        </span>
      ),
    },
    ...formattedDateLabels.map((label, i) => ({
      header: label,
      accessor: (item: { readings: any[]; }) => item.readings[i] ?? "-",
    })),
  ];
// console.log("test");
  return (
    <div className="overflow-x-auto w-full m-4 custom-scrollbar">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td
                  key={`${index}-${colIndex}`}
                  className="px-6 py-4 whitespace-nowrap border-b border-gray-200"
                >
                {column.accessor(item) ? column.accessor(item) : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
