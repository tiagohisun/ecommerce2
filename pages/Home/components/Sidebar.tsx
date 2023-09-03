import React from 'react';

const Sidebar = () => {
    return (
      // Button Responsive Side Bar
      <div className="flex bg-blue-100 mr-5 m-0 pt-10">

      {/* Title */}
        <div className="bg-pink-200 w-[280px] h-[794px] relative overflow-hidden">
          <div className="w-[132px] h-8  left-0 top-7 overflow-hidden rounded-md border border-[#dde2e4]">
            <p className="left-0 top-0 text-sm font-semibold text-left text-[#252c32]">Price, $</p>
          </div>

      {/* Inputs */}
          <div className="w-[132px] h-8 absolute left-0 top-7 overflow-hidden rounded-md bg-white border border-[#dde2e4]">
            <p className="w-[108px] absolute left-3 top-1 text-sm text-left text-[#9aa6ac]">Min</p>
          </div>
          <div className="w-[132px] h-8 absolute left-36 top-7 overflow-hidden rounded-md bg-white border border-[#dde2e4]">
            <p className="w-[108px] absolute left-3 top-1 text-sm text-left text-[#9aa6ac]">Max</p>
          </div>

      {/* Blocks Captions & Sub Items */}
          <div className="block justify-start items-start w-[280px] absolute left-0 top-[110px] gap-2">
            <p className="flex left-0 top-20 text-sm font-semibold text-left text-[#252c32]"> Quadcopter Features </p>
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2.5 py-1">
          <div className="flex-grow-0 flex-shrink-0 w-4 h-4 relative rounded bg-[#f6f8f9] border border-[#b0babf]" />
            <p className="flex-grow w-64 text-sm text-left text-[#252c32]">App-Controlled</p>
          </div>
          </div>
      </div>
    </div>
    );
};

export default Sidebar;