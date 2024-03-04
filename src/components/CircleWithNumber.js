import React from 'react';

const CircleWithNumber = ({ number }) => {
  return (
    <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full text-white">
      <span className="text-sm font-bold">{number}</span>
    </div>
  );
};

export default CircleWithNumber;
