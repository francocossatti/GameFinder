import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  // Clases de color de texto e iconos para modo oscuro
  const textColorClass = "text-white";
  const iconColorClass = "text-white";

  return (
    <footer className="w-full mx-auto mt-8 md:mt-12 px-4 sm:px-6 trasparent">
      <hr className="w-full border-t border-neutral-200 my-0 mx-auto"></hr>
      <div className="mx-auto p-4 flex flex-col text-center md:flex-row md:justify-between">
        <div className={`flex flex-row items-center justify-center space-x-1 ${textColorClass}`}>
          <span>© 2024 Franco Cossatti</span>
          <a href="/" className="hover:underline"></a>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">
          <a href="https://github.com/francocossatti" rel="noreferrer" target="_blank">
            <AiOutlineGithub
              className={`hover:-translate-y-1 transition-transform cursor-pointer ${iconColorClass}`}
              size={30}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/franco-cossatti/"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className={`hover:-translate-y-1 transition-transform cursor-pointer ${iconColorClass}`}
              size={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
