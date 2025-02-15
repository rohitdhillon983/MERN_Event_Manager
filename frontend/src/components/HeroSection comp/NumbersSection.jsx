import React from 'react';

const NumbersSection = () => {
  const numbers = [
    {
      number: '1M',
      label: 'CUSTOMERS',
    },
    {
      number: '12',
      label: 'YEARS OF EXCELLENCE',
    },
    {
      number: '41',
      label: 'R&D ENGINEERS',
    },
    {
      number: '78',
      label: 'COUNTRIES',
    },
    {
      number: '3287',
      label: 'PARTNERS',
    },
    {
      number: '41',
      label: 'AWARDS RECEIVED',
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-[14px] leading-[38.4px] tracking-[0.16px] font-bold text-center text-green-700">Why EventHub.com</h2>
        <h3 className="text-[32px] leading-[38.4px] tracking-[0.16px] font-bold text-center mb-8 max-[768px]:text-[24px]">Some Numbers are important</h3>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {numbers.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-5xl font-extrabold textcolor max-[425px]:text-3xl">{item.number}<sup className='textcolor'>+</sup></span>
              <span className="text-[16px] text-[#181617] font-bold mt-2 max-[425px]:text-[14px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;