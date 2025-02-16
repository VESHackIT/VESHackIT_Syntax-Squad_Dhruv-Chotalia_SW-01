import React from "react";

const Achievement = ({ title, description, icon }) => {
  const getIconClass = (iconName) => {
    switch (iconName) {
      case "trophy":
        return "fas fa-trophy text-yellow-500";
      case "star":
        return "fas fa-star text-yellow-500";
      case "target":
        return "fas fa-bullseye text-red-500";
      default:
        return "fas fa-medal text-yellow-500";
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 flex items-start">
      <div className="text-3xl mr-4">
        <i className={getIconClass(icon)}></i>
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Achievement;
