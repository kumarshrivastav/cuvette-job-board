import React from "react";
import { HiHome } from "react-icons/hi2";

const Structure = ({ children }) => {
  return (
    <>
      <div className="border-b border-blue-600"></div>
      <div className="flex mr-96">
        <div className="mt-12 ml-3 lg:ml-7 text-gray-600">
          <HiHome size={20} />
        </div>
        <div className="flex w-full border-l mr-96 fixed inset-x-10 lg:inset-x-20 min-h-full border-blue-600">
          {children}
        </div>
      </div>
    </>
  );
};

export default Structure;
