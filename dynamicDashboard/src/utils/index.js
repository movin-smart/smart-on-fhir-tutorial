import { useEffect, useState } from "react";
export const DATE_OPTIONS = ["7 days", "30 days", "From"];
export const VITAL_OPTIONS = [
    "All",
    "Blood Pressure",
    "Heart Rate",
    "Weight",
    "Glucose",
    "SPO2",
];
export const STATUS_ITEMS = [
    { label: "days left", value: 2 },
    { label: "mins needed", value: 0 },
    { label: "mins ccm", value: 0 },
    { label: "mins RPM", value: 20 },
    { label: "readings needed", value: 15 },
];
export const dateOptions = ["7 days", "30 days", "From"];
export const vitalOptions = [
    "All",
    "Blood Pressure",
    "Heart Rate",
    "Weight",
    "Glucose",
    "SPO2",
];
export const generateRandomReadings = (numPoints, min, max) => Array.from({ length: numPoints }, () => Math.floor(Math.random() * (max - min + 1)) + min);
export const useDateRange = (selectedOption, selectedStartDate, selectedEndDate) => {
    const [numberOfPoints, setNumberOfPoints] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        const endDate = new Date(); // Today's date
        let startDate;
        if (selectedOption === "7 days") {
            startDate = new Date();
            startDate.setDate(endDate.getDate() - 6);
            setStartDate(startDate);
            setEndDate(endDate);
            setNumberOfPoints(7);
        }
        else if (selectedOption === "30 days") {
            startDate = new Date();
            startDate.setDate(endDate.getDate() - 29);
            setStartDate(startDate);
            setEndDate(endDate);
            setNumberOfPoints(30);
        }
        else if (selectedOption === "From" && selectedStartDate && selectedEndDate) {
            const diffTime = Math.abs(selectedEndDate.getTime() - selectedStartDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setNumberOfPoints(diffDays);
            setStartDate(selectedStartDate);
            setEndDate(selectedEndDate);
        }
    }, [selectedOption, selectedStartDate, selectedEndDate]);
    return { startDate, endDate, numberOfPoints, setNumberOfPoints };
};
export const generateLabelsForDateRange = (startDate, endDate) => {
    if (!startDate || !endDate)
        return [];
    const labels = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        labels.push(currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        }));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return labels;
};
