"use client";
import Slider, { CustomArrowProps } from 'react-slick';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function obtenerTextoRecortado(texto: string): string {
  const maxLength = 277;
  if (texto.length > maxLength) {
    const puntoAntesLimite = texto.lastIndexOf('.', maxLength);
    if (puntoAntesLimite !== -1) {
      return texto.substring(0, puntoAntesLimite + 1); // +1 para incluir el punto en el resultado
    } else {
      return texto.substring(0, maxLength);
    }
  }
  return texto;
}

type Repo = {
  id: number;
  cover: {
    url: string;
  };
  genres: Array<{
    name: string;
  }>;
  name: string;
  screenshots: Array<{
    url: string;
  }>;
  summary: string;
};

function findClosestRepoIndexByName(repos: Repo[], input: string): number {
  if (repos.length === 0) {
    throw new Error('Input array is empty');
  }

  let minDistance = Infinity;
  let closestIndex = -1;

  for (let i = 0; i < repos.length; i++) {
    const distance = levenshteinDistance(repos[i].name.toLowerCase(), input.toLowerCase());

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
}

function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export default async function gameInfo({ gameInfo, input }: { gameInfo: Repo[], input: string }){

  const getResizedImageUrl = (url: string, size: string) => {
    const hash = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.png`;
  };

  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      onClick={onClick}
      className="custom-next-arrow" // Agrega una clase CSS para estilizar o posicionar
    >
      <FaArrowRight className='size-5 2xl:size-10'/>
    </div>
  );

  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      onClick={onClick}
      className="custom-prev-arrow" // Agrega una clase CSS para estilizar o posicionar
    >
      <FaArrowLeft className='size-5 2xl:size-10'/>
    </div>
  );

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold:100,
    draggable: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  
  const index = findClosestRepoIndexByName(gameInfo, input);
  const dataSummary = gameInfo[index]?.summary || '';
  const textoModificado = obtenerTextoRecortado(dataSummary);

  return (
    <div className='w-full relative'>
      <div className="w-full h-full text-center relative"> 
        <div className="firstcarousel-container w-full relative">
          <Slider {...settings}>
          {gameInfo[index] && gameInfo[index].screenshots && gameInfo[index].screenshots.map((screenshot, index) => (
              <div key={index} className="w-full relative">
                <img
                  className="rounded-md w-full h-[32lvh] xl:h-[60lvh] mx-auto delay-150" 
                  src={getResizedImageUrl(screenshot.url, 'screenshot_huge')}
                  alt={gameInfo[index]?.name}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className='xl:w-auto xl:max-w-md flex xl:justify-normal justify-center'>
        <img
          className="absolute top-0 w-[20lvh] mt-[22lvh] xl:w-[40lvh] xl:mt-[45lvh] xl:ml-[4lvh] drop-shadow-xl shadow-xl rounded-md"
          src={gameInfo[index]?.cover?.url ? getResizedImageUrl(gameInfo[index].cover.url, 'cover_big') : 'URL_POR_DEFECTO'}
        />
        </div>
        <h1 className="relative text-white xl:text-left xl:ml-[48lvh] 2xl:text-[6rem] mt-[16lvh] xl:mt-0 text-4xl xl:text-6xl">{gameInfo[index]?.name}</h1>
        <div className="relative xl:ml-[48lvh] xl:text-left xl:absolute flex flex-wrap xl:flex-nowrap justify-center items-center text-white">
          <h1 className="mt-2 text-md 2xl:text-4xl xl:text-2xl">{textoModificado}</h1>
        </div>
        <div className="relative xl:absolute xl:ml-[48lvh] 2xl:text-3xl xl:text-sm mt-[2lvh] xl:mt-[22lvh] xl:text-left w-full xl:w-auto flex flex-wrap xl:flex-nowrap justify-center items-center">
  {gameInfo[index] && gameInfo[index].genres && gameInfo[index].genres.map((genre, index) => (
    <span key={index} className="bg-white mt-1 inline-flex justify-center items-center xl:p-[1.5lvh] p-2 mx-1 rounded-full">{genre.name}</span>
  ))}
</div>
      </div>
    </div>
  );  
}