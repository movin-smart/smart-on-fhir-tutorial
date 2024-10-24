import React from 'react';

interface DiagnosisProps {
  diagnosis: {
    name: string;
    code: string;
    isSelected: boolean;
  };
}

const DiagnosisItem: React.FC<DiagnosisProps> = ({ diagnosis }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center items-start mt-4 w-full text-base font-medium max-md:max-w-full">
      <div className="flex flex-1 shrink gap-3 items-center basis-0 min-w-[240px] text-neutral-900 max-md:max-w-full">
        <div className={`flex gap-1 justify-center items-center self-stretch ${diagnosis.isSelected ? 'px-1 my-auto w-6 h-6 bg-blue-600' : 'py-1'} rounded-lg ${!diagnosis.isSelected && 'border border-solid border-slate-400'} min-h-[24px]`}>
          {diagnosis.isSelected && (
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/96de6a6d4c9df88c12021210fa040d068cb49364a89273dc2df5655bdfeba2a5?placeholderIfAbsent=true&apiKey=1431ecc5d41640c583e04eceba484aba" className="object-contain self-stretch my-auto w-4 aspect-square" alt="" />
          )}
        </div>
        <div className="flex-1 shrink self-stretch my-auto basis-0">
          {diagnosis.name}
        </div>
      </div>
      <div className="text-slate-400">{diagnosis.code}</div>
    </div>
  );
};

export default DiagnosisItem;