import React from "react";

const RightSidebar = ({ isOpen, answers, currentIndex,goToQuestion }) => {
  return (
    <aside
      className={`w-[220px] h-full  bg-white border-l border-gray-200 px-4 py-6 flex flex-col justify-between transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="grid grid-cols-5 gap-2">
        {[...Array(10)].map((_, i) => {
          let bgColor = "bg-white";
          if (answers.hasOwnProperty(i)) {
            bgColor = "bg-green-300";  
          } else if (i > currentIndex) {
            bgColor = "bg-blue-400";  
          }
          return (
            <button
              key={i}
              onClick={() => goToQuestion(i)}
              className={`w-8 h-8 rounded ${bgColor} hover:bg-blue-400 text-sm font-medium`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-600 space-y-2 mt-6">
        <p>
          <span className="inline-block w-4 h-4 bg-green-300 mr-2 rounded-sm"></span>
          Attended
        </p>
        <p>
          <span className="inline-block w-4 h-4 bg-white border mr-2 rounded-sm"></span>
          Not Attended
        </p>
        <p>
          <span className="inline-block w-4 h-4 bg-blue-400 mr-2 rounded-sm"></span>
          Yet to Attend
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
