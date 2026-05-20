import React from "react";
import { useBlogStore } from "../../store/blogStorage";

export const Notification = () => {
  const { notification } = useBlogStore();
  return (
    <div
      className={`fixed top-15 right-5 flex w-3/4 max-w-96 h-24 bg-gray-600 rounded-xl overflow-hidden shadow-lg transition-all duration-300 pointer-events-none ${notification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"} z-50`}
    >
      <svg
        width="16"
        height="96"
        xmlns="http://www.w3.org/2000/svg"
        className="text-indigo-500 fill-current"
      >
        <path
          d="M 8 0 
               Q 4 4.8, 8 9.6 
               T 8 19.2 
               Q 4 24, 8 28.8 
               T 8 38.4 
               Q 4 43.2, 8 48 
               T 8 57.6 
               Q 4 62.4, 8 67.2 
               T 8 76.8 
               Q 4 81.6, 8 86.4 
               T 8 96 
               L 0 96 
               L 0 0 
               Z"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
      </svg>
      <div className="mx-2.5 overflow-hidden w-full">
        <p className="mt-1.5 text-xl font-bold text-indigo-500 leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
          Success !
        </p>
        <p className="overflow-hidden leading-5 break-all text-zinc-300 max-h-10">
          So good!
          <br />
          {notification}
        </p>
      </div>
    </div>
  );
};
