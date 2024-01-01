import React from "react";
import {
    AiOutlineGithub,
    AiOutlineLinkedin,
  } from "react-icons/ai";
import { useTheme } from "next-themes";

  const Footer = () => {
    const { theme } = useTheme();
    const textColorClass = theme === "dark" ? "text-neutral-100" : "text-neutral-900";

    return (
        <footer className="w-full mx-auto px-4 sm:px-6">
          <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0"></hr>
          <div className="mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
            <div className={`flex flex-row items-center justify-center space-x-1 ${textColorClass}`}>
              © 2023 Franco Cossatti<a href="/" className="hover:underline"></a>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 mb-1">
              <a href="https://github.com/hqasmei" rel="noreferrer" target="_blank">
                <AiOutlineGithub
                  className={`hover:-translate-y-1 transition-transform cursor-pointer ${textColorClass}`}
                  size={30}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/hosnaqasmei/"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineLinkedin
                  className={`hover:-translate-y-1 transition-transform cursor-pointer ${textColorClass}`}
                  size={30}
                />
              </a>
            </div>
          </div>
        </footer>
      );
    };

  export default Footer;