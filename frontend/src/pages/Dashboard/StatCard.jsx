import React from "react";

const StatCard = ({ title, value, subtitle, icon, bgColor }) => {
  const getIconClass = (iconName) => {
    switch (iconName) {
      case "fire":
        return "fas fa-fire text-red-500";
      case "star":
        return "fas fa-star text-yellow-500";
      case "check":
        return "fas fa-check-circle text-green-500";
      case "target":
        return "fas fa-bullseye text-red-500";
      default:
        return "fas fa-chart-bar text-blue-500";
    }
  };

  return (
    <div className={`rounded-lg shadow p-6 ${bgColor || "bg-white"}`}>
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="text-2xl">
          <i className={getIconClass(icon)}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
