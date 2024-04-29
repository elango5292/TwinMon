


import React, { useState } from 'react'

export default function MachineCard({ name = "Printer", status = "Online" }) {
  const [currentColor, setCurrentColor] = useState("green");



  const colors = {
    online: "green",
    offline: "red",
    warning: "yellow",
  };

  return (
    <div className='flex-row h-auto m-1 inline-flex gap-x-2 items-center p-3 bg-white hover:bg-gray-200 rounded-[45px] shadow-inner border border-neutral-400'>
    <div className='w-5 h-5 bg-green-300 rounded-full border-2 border-green-600' /> {/* Fixed width circle outside */}
    <div className='inline-flex'>
      <p className='text-stone-900 text-lg font-semibold'>{name}</p>
    </div>
  </div>
  );
}

