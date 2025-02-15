import React from 'react';
import '../App.css'

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative w-full flex justify-center items-center">
        {/* Ring 1 */}
        <div className="relative w-36 h-36 rounded-full border-4 border-transparent border-t-4 border-t-blue-400 animate-spin-slow animate-spin">
          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
        </div>

        {/* Ring 2 */}
        <div className="relative w-36 h-36 rounded-full border-4 border-transparent border-l-4 border-l-green-400 animate-spin-reverse-slow -mx-9">
          <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
        </div>

        {/* Ring 3 */}
        <div className="absolute -top-16 w-36 h-36 rounded-full border-4 border-transparent border-l-4 border-l-purple-400 animate-spin-reverse-slow ring3">
          <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
        </div>

        {/* Loading Text */}
        <p className="absolute -bottom-20 font-mono text-xl text-black tracking-widest">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;