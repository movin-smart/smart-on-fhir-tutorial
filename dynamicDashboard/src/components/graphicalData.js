import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import ZoomInIcon from "../assets/zoom-in.svg";
import ZoomOutIcon from "../assets/zoom-out.svg";
import ScrollLeftIcon from "../assets/scroll-left.svg";
import ScrollRightIcon from "../assets/scroll-right.svg";
ChartJS.defaults.font.family = "Urbanist";
const verticalLinePlugin = {
    id: "verticalLine",
    beforeDraw: (chart) => {
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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, verticalLinePlugin);
const getColor = (vital) => {
    if (vital.includes("Systolic")) {
        return "rgba(255, 99, 132, 1)"; // Red for Systolic
    }
    else if (vital.includes("Diastolic")) {
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
const GraphData = ({ data, dateRangeLabels }) => {
    const chartRef = React.useRef(null);
    const [tooltipData, setTooltipData] = useState(null);
    const [selectedTooltipDate, setSelectedTooltipDate] = useState(null);
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
            mode: "index",
        },
        plugins: {
            legend: {
                display: false,
                position: "bottom",
                align: "start",
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
                    title: (tooltipItem) => {
                        const index = tooltipItem[0].dataIndex;
                        setSelectedTooltipDate(dateRangeLabels[index]);
                        return dateRangeLabels[index];
                    },
                    label: (tooltipItem) => {
                        const newTooltipData = {};
                        tooltipItem.chart.data.datasets.forEach((dataset) => {
                            const label = dataset.label;
                            const value = dataset.data[tooltipItem.dataIndex];
                            newTooltipData[label] = value;
                        });
                        setTooltipData(newTooltipData);
                        const value = tooltipItem.formattedValue;
                        const formattedValue = value === '0' ? 'NA' : value; // Handle zero values
                        return ` ${tooltipItem.dataset.label} ${tooltipItem.dataset.label === "Blood Pressure Systolic"
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
                                                : ""}: ${formattedValue}`;
                    },
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "x",
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
                    callback: (value) => {
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
            }
            else if (newMin > dateRangeLabels.length - 1) {
                newMin = dateRangeLabels.length - 7;
                newMax = dateRangeLabels.length;
            }
            chart.options.scales.x.min = newMin;
            chart.options.scales.x.max = newMax;
            chart.update();
        }
    };
    return (_jsxs("div", { className: "w-full relative", children: [_jsxs("div", { className: "bg-gray-50 m-2 md:m-6 p-6 rounded-3xl", children: [_jsxs("div", { className: "flex absolute right-3 md:right-10 justify-end space-x-4", children: [_jsx("button", { className: "p-3 bg-gray-200 rounded-full", onClick: handleZoomIn, children: _jsx("img", { src: ZoomInIcon, width: 20 }) }), _jsx("button", { className: "p-3 bg-gray-200 rounded-full", onClick: handleZoomOut, children: _jsx("img", { src: ZoomOutIcon, width: 20 }) }), _jsx("button", { className: "p-3 bg-gray-200 rounded-full", onClick: handleScrollLeft, children: _jsx("img", { src: ScrollLeftIcon, width: 20 }) }), _jsx("button", { className: "p-3 bg-gray-200 rounded-full", onClick: handleScrollRight, children: _jsx("img", { src: ScrollRightIcon, width: 20 }) })] }), _jsx("div", { className: "w-full h-64 mt-16", style: { maxWidth: "100%" }, children: _jsx(Line, { ref: chartRef, data: chartData, options: options }) })] }), _jsx("div", { className: "hidden md:flex p-3 mx-6 space-x-4 space-y-0 my-2 flex-row", children: data.map((point) => (_jsxs("div", { className: "flex space-x-2", children: [_jsx("div", { className: "w-5 h-5 rounded-full", style: {
                                backgroundColor: getColor(point.vital),
                            } }), _jsx("label", { children: point.vital })] }, point.vital))) }), _jsx("div", { className: "flex flex-col md:hidden p-3 space-y-2 ", children: tooltipData ? (_jsxs("div", { children: [_jsx("label", { className: "flex justify-center font-bold mb-2", children: selectedTooltipDate }), Object.entries(tooltipData).map(([label, value]) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex space-x-3", children: [_jsx("div", { className: "w-5 h-5 rounded-full", style: {
                                                backgroundColor: getColor(label),
                                            } }), _jsx("label", { children: label })] }), _jsxs("div", { className: "flex space-x-1", children: [_jsx("label", { className: "font-semibold", children: value }), _jsx("label", { className: "text-gray-400 font-semibold", children: label === "Blood Pressure Systolic"
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
                                                                    : null })] })] }, label)))] })) : null })] }));
};
export default GraphData;
