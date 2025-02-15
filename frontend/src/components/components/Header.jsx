import React from "react";

const Header = () => (
  <header className="w-full py-6 bg-gradient-to-r from-black via-indigo-950 to-purple-950 shadow-lg relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-20">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animation: `twinkle ${Math.random() * 3 + 1}s infinite`
          }}
        />
      ))}
    </div>
    <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg relative">
      Cosmic Spelling Adventure
    </h1>
    <p className="text-center text-indigo-200/90 text-sm mt-2 relative">
      Journey through the stars with stellar spelling practice
    </p>
  </header>
);

export default Header;