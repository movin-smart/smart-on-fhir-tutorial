import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import ZoomInIcon from "../assets/zoom-in.svg";
import ZoomOutIcon from "../assets/zoom-out.svg";
import ScrollLeftIcon from "../assets/scroll-left.svg";
import ScrollRightIcon from "../assets/scroll-right.svg";

ChartJS.defaults.font.family = "Urbanist";

const verticalLinePlugin = {
  id: "verticalLine",
  beforeDraw: (chart: any) => {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      ctx.save();
      const activePoint = chart.tooltip._active[0];
      const x = activePoint.element.x;
      const yAxis = chart.scales.y;
      ctx.beginPath();
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.9)"; // Line color
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  verticalLinePlugin
);

interface GraphDataProps {
  data: { vital: string; readings: number[] }[];
  dateRangeLabels: string[];
}

const getColor = (vital: string) => {
  if (vital.includes("Systolic")) {
    return "rgba(255, 99, 132, 1)"; // Red for Systolic
  } else if (vital.includes("Diastolic")) {
    return "rgba(255, 159, 64, 1)"; // Orange for Diastolic
  }
  switch (vital) {
    case "Heart Rate":
      return "rgba(54, 162, 235, 1)"; // Blue for Heart Rate
    case "Weight":
      return "rgba(255, 206, 86, 1)"; // Yellow for Weight
    case "Glucose":
      return "rgba(153, 102, 255, 1)"; // Purple for Glucose
    case "SPO2":
      return "rgba(75, 192, 192, 1)"; // Green for SPO2
    default:
      return "rgba(201, 203, 207, 1)"; // Grey for unknown vitals
  }
};

const GraphData: React.FC<GraphDataProps> = ({ data, dateRangeLabels }) => {
  const chartRef = React.useRef<any>(null);
  const [tooltipData, setTooltipData] = useState<{
    [label: string]: number | string;
  } | null>(null);
  const [selectedTooltipDate, setSelectedTooltipDate] = useState<string | null>(
    null
  );

  const handleZoomIn = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.zoom(1.2);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.zoom(0.8);
    }
  };

  const formattedLabels = dateRangeLabels.map((label) => {
    const date = new Date(label);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  });

  // Calculate y-axis min and max values dynamically
  const allReadings = data.flatMap(item => item.readings);
  const minY = Math.min(...allReadings.filter(value => !isNaN(value)));
  const maxY = Math.max(...allReadings.filter(value => !isNaN(value)));
  
  const chartData = {
    labels: formattedLabels,
    datasets: data.map((item) => ({
        label: item.vital,
        data: item.readings.slice(0, dateRangeLabels.length).map(value => isNaN(value) ? null : value),
        fill: false,
        borderColor: getColor(item.vital),
        backgroundColor: getColor(item.vital),
        pointBorderColor: "transparent",
        borderWidth: 2,
        borderRadius: 20,
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        pointRadius: 0,
        tension: 0.4,
    })),
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: true,
    mode: "index" as const,
  },
  plugins: {
    legend: {
      display: false,
      position: "bottom" as const,
      align: "start" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
      intersect: false,
      backgroundColor: "white",
      titleColor: "black",
      titleFont: {
        weight: 500,
        size: 15,
      },
      usePointStyle: true,
      pointStyle: "circle",
      bodyColor: "black",
      cornerRadius: 10,
      padding: 10,
      callbacks: {
        title: (tooltipItem: any) => {
          const index = tooltipItem[0].dataIndex;
          setSelectedTooltipDate(dateRangeLabels[index]);
          return dateRangeLabels[index];
        },
        label: (tooltipItem: any) => {
          const newTooltipData: { [label: string]: number | string } = {};
          tooltipItem.chart.data.datasets.forEach((dataset: any) => {
            const label = dataset.label;
            const value = dataset.data[tooltipItem.dataIndex];
            newTooltipData[label] = value;
          });
          setTooltipData(newTooltipData);

          const value = tooltipItem.formattedValue;

          const formattedValue = value === '0' ? 'NA' : value; // Handle zero values

          return ` ${tooltipItem.dataset.label} ${
            tooltipItem.dataset.label === "Blood Pressure Systolic"
              ? "( mmHg )"
              : tooltipItem.dataset.label === "Blood Pressure Diastolic"
              ? "( mmHg )"
              : tooltipItem.dataset.label === "Heart Rate"
              ? "( bpm )"
              : tooltipItem.dataset.label === "Weight"
              ? "( lbs )"
              : tooltipItem.dataset.label === "Glucose"
              ? "( mg/dl )"
              : tooltipItem.dataset.label === "SPO2"
              ? "( % )"
              : ""
          }: ${formattedValue}`;
        },
      },
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x" as "x",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x" as "x",
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "#e5e5e5",
        borderColor: "#ccc",
        borderWidth: 1,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
      min: 0,
      max: 7,
    },
    y: {
      grid: {
        color: "#e5e5e5",
        borderColor: "#ccc",
        borderWidth: 1,
      },
      min: Math.max(0, minY - 10), // Ensure y-axis min is not negative
      max: maxY + 10, // Add some padding to the max value
      ticks: {
        stepSize: 20,
        callback: (value: string | number) => {
          return value === 0 ? 'NA' : value;
        },
      },
    },
  },
  
};
useEffect(() => {
    console.log("Reading Values:", data);
    console.log("Date Range Labels:", dateRangeLabels);
  }, [data, dateRangeLabels]);

  const handleScrollLeft = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const currentMin = chart.options.scales.x.min;
      const currentMax = chart.options.scales.x.max;

      let newMin = currentMin - 7;
      let newMax = currentMax - 7;

      if (newMin < 0) {
        newMin = 0;
        newMax = 7;
      }

      chart.options.scales.x.min = newMin;
      chart.options.scales.x.max = newMax;
      chart.update();
    }
  };

  const handleScrollRight = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const currentMin = chart.options.scales.x.min;
      const currentMax = chart.options.scales.x.max;

      let newMin = currentMin + 7;
      let newMax = currentMax + 7;

      if (newMax >= dateRangeLabels.length) {
        newMax = dateRangeLabels.length - 1;
        newMin = newMax - 7;
      } else if (newMin > dateRangeLabels.length - 1) {
        newMin = dateRangeLabels.length - 7;
        newMax = dateRangeLabels.length;
      }

      chart.options.scales.x.min = newMin;
      chart.options.scales.x.max = newMax;
      chart.update();
    }
  };

  return (
    <div className="w-full relative">
      <div className="bg-gray-50 m-2 md:m-6 p-6 rounded-3xl">
        <div className="flex absolute right-3 md:right-10 justify-end space-x-4">
          <button
            className="p-3 bg-gray-200 rounded-full"
            onClick={handleZoomIn}
          >
            <img src={ZoomInIcon} width={20} />
          </button>
          <button
            className="p-3 bg-gray-200 rounded-full"
            onClick={handleZoomOut}
          >
            <img src={ZoomOutIcon} width={20} />
          </button>
          <button
            className="p-3 bg-gray-200 rounded-full"
            onClick={handleScrollLeft}
          >
            <img src={ScrollLeftIcon} width={20} />
          </button>
          <button
            className="p-3 bg-gray-200 rounded-full"
            onClick={handleScrollRight}
          >
            <img src={ScrollRightIcon} width={20} />
          </button>
        </div>
        <div className="w-full h-64 mt-16" style={{ maxWidth: "100%" }}>
          <Line ref={chartRef} data={chartData} options={options} />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex p-3 mx-6 space-x-4 space-y-0 my-2 flex-row">
        {data.map((point) => (
          <div key={point.vital} className="flex space-x-2">
            <div
              className="w-5 h-5 rounded-full"
              style={{
                backgroundColor: getColor(point.vital),
              }}
            ></div>
            <label>{point.vital}</label>
          </div>
        ))}
      </div>
      
      {/* Mobile View */}
      <div className="flex flex-col md:hidden p-3 space-y-2 ">
        {tooltipData ? (
          <div>
            <label className="flex justify-center font-bold mb-2">
              {selectedTooltipDate}
            </label>
            {Object.entries(tooltipData).map(([label, value]) => (
              <div className="flex justify-between" key={label}>
                <div className="flex space-x-3">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      backgroundColor: getColor(label),
                    }}
                  ></div>
                  <label>{label}</label>
                </div>
                <div className="flex space-x-1">
                  <label className="font-semibold">{value}</label>
                  <label className="text-gray-400 font-semibold">
                  {label === "Blood Pressure Systolic"
                      ? "mmHg"
                      : label === "Blood Pressure Diastolic"
                      ? "mmHg"
                      : label === "Heart Rate"
                      ? "Bpm"
                      : label === "Weight"
                      ? "KG"
                      : label === "Glucose"
                      ? "mg/dl"
                      : label === "SPO2"
                      ? "%"
                      : null}
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GraphData;
// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import zoomPlugin from "chartjs-plugin-zoom";
// import ZoomInIcon from "../assets/zoom-in.svg";
// import ZoomOutIcon from "../assets/zoom-out.svg";
// import ScrollLeftIcon from "../assets/scroll-left.svg";
// import ScrollRightIcon from "../assets/scroll-right.svg";

// ChartJS.defaults.font.family = "Urbanist";

// const verticalLinePlugin = {
//   id: "verticalLine",
//   beforeDraw: (chart: any) => {
//     if (chart.tooltip._active && chart.tooltip._active.length) {
//       const ctx = chart.ctx;
//       ctx.save();
//       const activePoint = chart.tooltip._active[0];
//       const x = activePoint.element.x;
//       const yAxis = chart.scales.y;
//       ctx.beginPath();
//       ctx.moveTo(x, yAxis.top);
//       ctx.lineTo(x, yAxis.bottom);
//       ctx.lineWidth = 1;
//       ctx.strokeStyle = "rgba(0, 0, 0, 0.9)"; // Line color
//       ctx.stroke();
//       ctx.restore();
//     }
//   },
// };

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin,
//   verticalLinePlugin
// );

// interface GraphDataProps {
//   data: { vital: string; readings: (number | string)[] }[];
//   dateRangeLabels: string[];
// }

// const getColor = (vital: string) => {
//   if (vital.includes("Systolic")) {
//     return "rgba(255, 99, 132, 1)"; // Red for Systolic
//   } else if (vital.includes("Diastolic")) {
//     return "rgba(255, 159, 64, 1)"; // Orange for Diastolic
//   }
//   switch (vital) {
//     case "Heart Rate":
//       return "rgba(54, 162, 235, 1)"; // Blue for Heart Rate
//     case "Weight":
//       return "rgba(255, 206, 86, 1)"; // Yellow for Weight
//     case "Glucose":
//       return "rgba(153, 102, 255, 1)"; // Purple for Glucose
//     case "SPO2":
//       return "rgba(75, 192, 192, 1)"; // Green for SPO2
//     default:
//       return "rgba(201, 203, 207, 1)"; // Grey for unknown vitals
//   }
// };

// const GraphData: React.FC<GraphDataProps> = ({ data, dateRangeLabels }) => {
//   const chartRef = React.useRef<any>(null);
//   const [tooltipData, setTooltipData] = useState<{
//     [label: string]: number | string;
//   } | null>(null);
//   const [selectedTooltipDate, setSelectedTooltipDate] = useState<string | null>(
//     null
//   );

//   useEffect(() => {
//     console.log("Reading Values:", data);
//     console.log("Date Range Labels:", dateRangeLabels);
//   }, [data, dateRangeLabels]);

//   // Filter data and labels based on readings
//   const filteredData = data.map(item => {
//     const validReadings = item.readings.map(value => (typeof value === "number" && !isNaN(value)) ? value : null);
//     const hasValues = validReadings.some(value => value !== null);
//     return hasValues ? { ...item, readings: validReadings } : null;
//   }).filter(item => item !== null) as { vital: string; readings: (number | null)[] }[];

//   const filteredLabels = dateRangeLabels.filter((_, index) =>
//     filteredData.some(item => item.readings[index] !== null)
//   );

//   const chartData = {
//     labels: filteredLabels,
//     datasets: filteredData.map(item => ({
//       label: item.vital,
//       data: item.readings.map(value => value === null ? null : value),
//       fill: false,
//       borderColor: getColor(item.vital),
//       backgroundColor: getColor(item.vital),
//       pointBorderColor: "transparent",
//       borderWidth: 2,
//       pointRadius: 0,
//       tension: 0.4,
//     })),
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       intersect: true,
//       mode: "index" as const,
//     },
//     plugins: {
//       legend: {
//         display: false,
//         position: "bottom" as const,
//         align: "start" as const,
//         labels: {
//           usePointStyle: true,
//           pointStyle: "circle",
//         },
//       },
//       title: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//         intersect: false,
//         backgroundColor: "white",
//         titleColor: "black",
//         titleFont: {
//           weight: 500,
//           size: 15,
//         },
//         bodyColor: "black",
//         cornerRadius: 10,
//         padding: 10,
//         callbacks: {
//           title: (tooltipItem: any) => {
//             const index = tooltipItem[0].dataIndex;
//             setSelectedTooltipDate(filteredLabels[index]);
//             return filteredLabels[index];
//           },
//           label: (tooltipItem: any) => {
//             const newTooltipData: { [label: string]: number | string } = {};
//             tooltipItem.chart.data.datasets.forEach((dataset: any) => {
//               const label = dataset.label;
//               const value = dataset.data[tooltipItem.dataIndex];
//               newTooltipData[label] = value;
//             });
//             setTooltipData(newTooltipData);
//             return ` ${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
//           },
//         },
//       },
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: "x" as "x",
//         },
//         zoom: {
//           wheel: {
//             enabled: true,
//           },
//           pinch: {
//             enabled: true,
//           },
//           mode: "x" as "x",
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: "#e5e5e5",
//           borderColor: "#ccc",
//           borderWidth: 1,
//         },
//         ticks: {
//           autoSkip: false,
//           maxRotation: 0,
//           minRotation: 0,
//         },
//       },
//       y: {
//         grid: {
//           color: "#e5e5e5",
//           borderColor: "#ccc",
//           borderWidth: 1,
//         },
//         min: 0,
//         max: Math.max(...filteredData.flatMap(item => item.readings).filter((v): v is number => v !== null)) + 10,
//       },
//     },
//   };

//   return (
//     <div className="w-full relative">
//       <div className="bg-gray-50 m-2 md:m-6 p-6 rounded-3xl">
//         <div className="w-full h-64 mt-16" style={{ maxWidth: "100%" }}>
//           <Line ref={chartRef} data={chartData} options={options} />
//         </div>
//       </div>

//       {/* Tooltip Data Display */}
//       <div className="flex flex-col">
//         {tooltipData && selectedTooltipDate && (
//           <div>
//             <label className="flex justify-center font-bold mb-2">
//               {selectedTooltipDate}
//             </label>
//             {Object.entries(tooltipData).map(([label, value]) => (
//               <div className="flex justify-between" key={label}>
//                 <div className="flex space-x-3">
//                   <div
//                     className="w-5 h-5 rounded-full"
//                     style={{
//                       backgroundColor: getColor(label),
//                     }}
//                   ></div>
//                   <label>{label}</label>
//                 </div>
//                 <div className="flex space-x-1">
//                   <label className="font-semibold">{value}</label>
//                   <label className="text-gray-400 font-semibold">
//                     {label.includes("Blood Pressure") ? "mmHg" : label.includes("Heart Rate") ? "bpm" : label.includes("Weight") ? "KG" : label.includes("Glucose") ? "mg/dl" : label.includes("SPO2") ? "%" : ""}
//                   </label>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GraphData;

