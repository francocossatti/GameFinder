"use client";
import React from 'react';
import AsyncSelect from 'react-select/async';
import SearchApi from '@/app/api/SearchApi';
import { useRouter } from 'next/navigation';
import { HiArrowDown } from "react-icons/hi"
import { Link } from "react-scroll/modules"

const Option = ({ innerProps, label, data }: any) => (
  <div {...innerProps} className="flex items-center cursor-pointer">
    <img src={data.value.cover?.url} alt={label} className="size-8 2xl:size-12 mr-2 mt-1 ml-1 rounded" />
    <span>{label}</span>
  </div>
);

const searchBarStyles = {
  input: (provided: any) => ({
    ...provided,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    border: '1px solid #ccc',
    padding: '0.5rem',
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: 12,
    border: '1px solid #ccc',
    minHeight: '3rem',
    width: '50dvw', // Set the default width
    '@media (max-width: 767px)': {
      // Apply new width for screens smaller than md (640px)
      width: '70dvw',
    },
    '@media (min-width: 768px) and (max-width: 1023px)': {
      // Apply new width for screens between md (768px) and lg (1024px)
      width: '80dvw',
    },
    '@media (min-width: 1900px)': {
      width: "50dvw",
    }
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: 12,
    backgroundColor: state.isSelected ? 'black' : 'black',
    color: 'black',
  }),
};

type GameInformation = {
  id: number;
  name: string;
  cover: { url: string };
};

const loadOptions = async (inputValue: string): Promise<{ value: GameInformation; label: string }[]> => {
  if (inputValue.length < 3) {
    return [];
  }

  const response = await SearchApi(inputValue);
  const data: GameInformation[] = response;

  return data.map((item) => ({ value: item, label: item.name }));
};

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      const nameWithDashes = selectedOption.value.name
        .replace(/[:]/g, '') // Replace ':' with nothing
        .replace(/\s/g, '-') // Replace spaces with -
        .replace(/\p{Uppercase}/gu, (c: string) => c.toLowerCase()); // Convert to lowercase
      router.push(`/${nameWithDashes}`);
    }
  };

  return (
      <div className="flex flex-col justify-center text-center items-center h-[100dvh] relative">
        <h1 className="font-mono text-6xl text-white mb-4">Game Finder</h1>
        <div className={`flex flex-col h-[40dvh] ${menuIsOpen ? 'mb-52 md:mb-24 2xl:mb-48 transition-all duration-300 ease-in-out' : 'transition-all duration-300 ease-in-out'}`}>
          <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              onChange={handleChange}
              components={{ Option }}
              styles={searchBarStyles}
              menuIsOpen={menuIsOpen}
              onMenuOpen={() => setMenuIsOpen(true)}
              onMenuClose={() => setMenuIsOpen(false)}
          />
        </div>
        <div className="absolute bottom-8">
          <Link
              to="recommended"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="md:inline-block" // Oculta en dispositivos móviles
          >
            <HiArrowDown size={35} className="text-white animate-bounce"/>
          </Link>
        </div>
      </div>
  );
};

export default SearchBar;