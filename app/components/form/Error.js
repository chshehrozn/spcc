import React from "react";

function Error({ value, className }) {
  return (
    <div className={`text-[12px] leading-4 text-red-600 mt-[0.1] ${className}`}>
      {value}
    </div>
  );
}

export default Error;
