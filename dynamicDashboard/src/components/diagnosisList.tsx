import React from 'react';
import DiagnosisItem from './diagnosisItem';
import CPTCode from './CPTcode';

interface Diagnosis {
  name: string;
  code: string;
  isSelected: boolean;
}

interface CPTCodeType {
  code: string;
  isSelected: boolean;
}

const diagnoses: Diagnosis[] = [
  { name: "Chest pain, unspecified", code: "R07.9", isSelected: true },
  { name: "Atherosclerotic heart disease of native coronary artery without angina pectoris", code: "i25.10", isSelected: false },
  { name: "Presence of coronary angioplasty implant and graft", code: "z95.5", isSelected: false },
  { name: "Essential (primary) hypertension", code: "E11.9", isSelected: false },
  { name: "Nonrheumatic mitral (valve) insufficiency", code: "i10", isSelected: false },
  { name: "Tobacco use, current", code: "Z72.0", isSelected: false },
];

const cptCodes: CPTCodeType[] = [
  { code: "99201", isSelected: true },
  { code: "99202", isSelected: false },
  { code: "99203", isSelected: false },
  { code: "99204", isSelected: false },
  { code: "99205", isSelected: false },
];

const DiagnosisList: React.FC = () => {
  return (
    <main className="flex flex-col justify-center p-8 bg-white max-w-[678px] rounded-[40px] max-md:px-5">
      <section className="flex flex-col w-full max-md:max-w-full">
        <p className="px-7 py-4 w-full text-base leading-6 rounded-3xl border border-none  text-neutral-900 max-md:px-5 max-md:max-w-full">
         
        </p>
        <div className="flex flex-col px-8 py-6 mt-6 w-full bg-stone-50 rounded-[40px] max-md:px-5 max-md:max-w-full">
          <header className="flex flex-wrap gap-10 justify-between items-center w-full font-medium leading-loose max-md:max-w-full">
            <h1 className="self-stretch my-auto text-3xl text-neutral-900">
             
            </h1>
            <button className="flex gap-3 items-center self-stretch p-3 my-auto text-base bg-white rounded-3xl border border-white border-solid text-slate-400">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d80d2213693a02b329b06d9c45821f7c160f0516862634821f726811a3e7fbca?placeholderIfAbsent=true&apiKey=1431ecc5d41640c583e04eceba484aba" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" alt="" />
              <span className="self-stretch my-auto">Add diagnosis</span>
            </button>
          </header>
          <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
              {diagnoses.map((diagnosis, index) => (
                <DiagnosisItem key={index} diagnosis={diagnosis} />
              ))}
            </div>
            <div className="flex flex-col w-2.5 rounded-lg">
              <div className="flex flex-col px-px pt-1 pb-56 rounded-lg bg-neutral-100 max-md:pb-24">
                <div className="flex shrink-0 mb-0 w-1 h-5 rounded-lg bg-neutral-200 max-md:mb-2.5" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-start self-start mt-6 max-md:max-w-full">
            {cptCodes.map((cptCode, index) => (
              <CPTCode key={index} cptCode={cptCode} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiagnosisList;