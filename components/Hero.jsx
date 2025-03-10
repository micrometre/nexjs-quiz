import React from 'react';
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen"> {/* Set a height for the hero section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center"> {/* Center content vertically and horizontally */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Welcome to QuizMaster
          </h1>
          <p className="mt-4 text-lg text-gray-300 sm:mt-6 sm:text-xl lg:text-2xl">
            Test your knowledge with our fun and challenging quizzes!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;






