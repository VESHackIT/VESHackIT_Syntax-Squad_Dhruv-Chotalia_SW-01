import React from "react";
import { useNavigate } from "react-router-dom";

const LearningModule = ({
  title,
  progress,
  status,
  buttonLabel,
  navigate: navigateTo,
}) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (status) {
      case "New":
        return (
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
            New
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">
            {progress}% Complete
          </span>
        );
    }
  };

  const handleClick = () => {
    navigate(navigateTo);
  };

  const getButtonColor = () => {
    if (title.includes("Word")) return "bg-purple-500 hover:bg-purple-600";
    if (title.includes("Spelling")) return "bg-orange-500 hover:bg-orange-600";
    if (title.includes("Story")) return "bg-green-500 hover:bg-green-600";
    return "bg-blue-500 hover:bg-blue-600";
  };

  const getProgressBarColor = () => {
    if (title.includes("Word")) return "bg-purple-500";
    if (title.includes("Spelling")) return "bg-orange-500";
    if (title.includes("Story")) return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-medium ${
              title.includes("Word")
                ? "text-purple-600"
                : title.includes("Spelling")
                  ? "text-orange-600"
                  : "text-green-600"
            }`}
          >
            {title}
          </h3>
          {getStatusBadge()}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className={`h-2 rounded-full ${getProgressBarColor()}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button
          onClick={handleClick}
          className={`w-full py-2 rounded-md text-white font-medium transition-colors ${getButtonColor()}`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default LearningModule;
