import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  const textColorClass = "text-white";
  const iconColorClass = "text-white";

  return (
      <div className='h-[10dvh] flex items-center'>
        <footer className="w-full px-4 trasparent">
          <hr className="w-full border-t border-neutral-200 "></hr>
          <div className="md:p-2 md:mx-3 flex flex-col text-center md:flex-row md:justify-between">
            <div className={`flex flex-row items-center 2xl:text-3xl justify-center space-x-1 ${textColorClass}`}>
              <span>© 2024 Franco Cossatti</span>
              <a href="/" className="hover:underline"></a>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 mb-1">
              <a href="https://github.com/francocossatti" rel="noreferrer" target="_blank">
                <AiOutlineGithub
                    className={`hover:-translate-y-1 size-8 2xl:size-14 transition-transform cursor-pointer ${iconColorClass}`}
                />
              </a>
              <a
                  href="https://www.linkedin.com/in/franco-cossatti/"
                  rel="noreferrer"
                  target="_blank"
              >
                <AiOutlineLinkedin
                    className={`hover:-translate-y-1 size-8 2xl:size-14 transition-transform cursor-pointer ${iconColorClass}`}
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Footer;
