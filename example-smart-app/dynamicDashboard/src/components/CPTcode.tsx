import React from 'react';

interface CPTCodeProps {
  cptCode: {
    code: string;
    isSelected: boolean;
  };
}

const CPTCode: React.FC<CPTCodeProps> = ({ cptCode }) => {
  return (
    <div className={`flex gap-2 justify-center items-center p-3.5 rounded-3xl bg-neutral-50 min-w-[84px] ${cptCode.isSelected ? 'text-neutral-900' : 'text-sm font-medium leading-none whitespace-nowrap text-neutral-900'}`}>
      <div className={`flex ${cptCode.isSelected ? 'gap-1 justify-center items-center self-stretch px-1 my-auto w-5 h-5 bg-blue-600' : 'shrink-0 gap-1 self-stretch my-auto w-5 h-5 border border-solid border-slate-400'} rounded-lg`}>
        {cptCode.isSelected && (
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7eda43770996f8ed8876d2765f4235c321db931b080008989dff140e8dc85efe?placeholderIfAbsent=true&apiKey=1431ecc5d41640c583e04eceba484aba" className="object-contain self-stretch my-auto w-3 aspect-square" alt="" />
        )}
      </div>
      <div className={`${cptCode.isSelected ? 'flex-1 shrink self-stretch my-auto text-sm font-medium leading-none basis-0' : 'self-stretch my-auto'}`}>
        {cptCode.code}
      </div>
    </div>
  );
};

export default CPTCode;