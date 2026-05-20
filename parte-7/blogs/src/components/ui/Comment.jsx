import React from "react";
import { useState } from "react";
import { useUpdateComment } from "../../hooks/useUpdate";
import { useBlogStore } from "../../store/blogStorage";

export const Comment = ({ id, handleClick }) => {
  const [textComment, setTextComment] = useState("");
  const { comment } = useUpdateComment();
  const { setNotification } = useBlogStore();
  function handleUpdateComment() {
    comment.mutate({ id, text: textComment });
    setTextComment("");
    handleClick();
    setNotification("You Commented", 2);
  }

  return (
    <div className="relative flex justify-between border border-white/10 rounded-xl bg-gradient-to-l from-gray-200 to-gray-300">
      <div className="overflow-y-auto w-full">
        <textarea
          rows="3"
          //   style="overflow: hidden; outline: none"
          className="w-full px-4 py-3 resize-none bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/50 align-top leading-normal max-h-[80px] text-black"
          placeholder="Ask me anything..."
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
          minLength={5}
        ></textarea>
      </div>
      <button
        onClick={handleUpdateComment}
        className="p-2 transition-colors text-blue-500 rotate-90 transition-transform cursor-pointer hover:text-blue-800 hover:scale-105 hover:rotate-0"
        aria-label="Send message"
        type="button"
      >
        <svg
          className="w-6 h-6"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle r="10" cy="12" cx="12"></circle>
          <path d="m16 12-4-4-4 4"></path>
          <path d="M12 16V8"></path>
        </svg>
      </button>
    </div>
  );
};
