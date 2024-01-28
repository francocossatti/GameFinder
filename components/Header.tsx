import React from 'react';
import { IoIosHome } from "react-icons/io";

export default function Header() {
    return (
      <header className="absolute top-2 z-10">
        <div className="container hover:translate-y-1 hover:scale-102 transition duration-300 mx-auto px-4">
          <a href="/" className="flex items-center text-white">
            <IoIosHome size={35} className="mr-2" />
            <h1 className="text-md font-bold">Go Home</h1>
          </a>
        </div>
      </header>
    );
  };
