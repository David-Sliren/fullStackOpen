import React from "react";

export const InterateButton = ({
  handleClick,
  className = "",
  title = "Logout",
}) => {
  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer bg-indigo-500 px-2 py-1 rounded-xl text-white group ${className}`}
    >
      <div className="relative overflow-hidden">
        <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
          {title}
        </p>
        <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
          {title}
        </p>
      </div>
    </button>
  );
};
