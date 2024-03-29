import React from 'react';

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative bg-white w-96 p-6 rounded-lg">
                <button className="absolute top-0 right-0 p-2" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
