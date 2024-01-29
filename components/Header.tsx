import React from 'react';
import { IoIosHome } from "react-icons/io";

export default function Header() {
    return (
      <header className="absolute top-2 z-10">
        <div className="container hover:translate-y-1 hover:scale-102 transition duration-300 mx-auto px-4">
          <a href="/" className="flex items-center text-white">
            <IoIosHome className="mr-2 size-8 2xl:size-14" />
            <h1 className="text-md 2xl:text-2xl font-bold">Go Home</h1>
          </a>
        </div>
      </header>
    );
  };
