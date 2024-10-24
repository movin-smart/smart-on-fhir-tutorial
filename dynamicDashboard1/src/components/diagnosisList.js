import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DiagnosisItem from './diagnosisItem';
import CPTCode from './CPTcode';
const diagnoses = [
    { name: "Chest pain, unspecified", code: "R07.9", isSelected: true },
    { name: "Atherosclerotic heart disease of native coronary artery without angina pectoris", code: "i25.10", isSelected: false },
    { name: "Presence of coronary angioplasty implant and graft", code: "z95.5", isSelected: false },
    { name: "Essential (primary) hypertension", code: "E11.9", isSelected: false },
    { name: "Nonrheumatic mitral (valve) insufficiency", code: "i10", isSelected: false },
    { name: "Tobacco use, current", code: "Z72.0", isSelected: false },
];
const cptCodes = [
    { code: "99201", isSelected: true },
    { code: "99202", isSelected: false },
    { code: "99203", isSelected: false },
    { code: "99204", isSelected: false },
    { code: "99205", isSelected: false },
];
const DiagnosisList = () => {
    return (_jsx("main", { className: "flex flex-col justify-center p-8 bg-white max-w-[678px] rounded-[40px] max-md:px-5", children: _jsxs("section", { className: "flex flex-col w-full max-md:max-w-full", children: [_jsx("p", { className: "px-7 py-4 w-full text-base leading-6 rounded-3xl border border-none  text-neutral-900 max-md:px-5 max-md:max-w-full" }), _jsxs("div", { className: "flex flex-col px-8 py-6 mt-6 w-full bg-stone-50 rounded-[40px] max-md:px-5 max-md:max-w-full", children: [_jsxs("header", { className: "flex flex-wrap gap-10 justify-between items-center w-full font-medium leading-loose max-md:max-w-full", children: [_jsx("h1", { className: "self-stretch my-auto text-3xl text-neutral-900" }), _jsxs("button", { className: "flex gap-3 items-center self-stretch p-3 my-auto text-base bg-white rounded-3xl border border-white border-solid text-slate-400", children: [_jsx("img", { loading: "lazy", src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d80d2213693a02b329b06d9c45821f7c160f0516862634821f726811a3e7fbca?placeholderIfAbsent=true&apiKey=1431ecc5d41640c583e04eceba484aba", className: "object-contain shrink-0 self-stretch my-auto w-5 aspect-square", alt: "" }), _jsx("span", { className: "self-stretch my-auto", children: "Add diagnosis" })] })] }), _jsxs("div", { className: "flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full", children: [_jsx("div", { className: "flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full", children: diagnoses.map((diagnosis, index) => (_jsx(DiagnosisItem, { diagnosis: diagnosis }, index))) }), _jsx("div", { className: "flex flex-col w-2.5 rounded-lg", children: _jsx("div", { className: "flex flex-col px-px pt-1 pb-56 rounded-lg bg-neutral-100 max-md:pb-24", children: _jsx("div", { className: "flex shrink-0 mb-0 w-1 h-5 rounded-lg bg-neutral-200 max-md:mb-2.5" }) }) })] }), _jsx("div", { className: "flex flex-wrap gap-4 items-start self-start mt-6 max-md:max-w-full", children: cptCodes.map((cptCode, index) => (_jsx(CPTCode, { cptCode: cptCode }, index))) })] })] }) }));
};
export default DiagnosisList;
