"use client"
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Repo = {
  id: number;
  name: string;
  similar_games: Array<{
    id: number;
    cover: {
      id: number;
      url: string;
    };
    name: string;
  }>;
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


export default function SimilarGames({ originalGame, input }: { originalGame: Repo[], input: string }) {
  const [isDragging, setIsDragging] = useState(false);

 // Se ejecuta cuando cambia id u options1

  const getResizedImageUrl = (url: string, size: string) => {
    const hash = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.png`;
  };

  function botonPresionado(id: number, name: string, event: React.MouseEvent<HTMLImageElement>) {    
    event.preventDefault();
    localStorage.setItem('id', id.toString());
    window.location.href = `/${encodeURIComponent(name.replace(/ /g, '-').replace(/:/g, '').toLowerCase())}`;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  touchThreshold:100,
  draggable: true,
  beforeChange: () => setIsDragging(true),
  afterChange: () => setIsDragging(false),
  responsive: [
    {
      breakpoint: 768, // Cambia este valor si lo deseas
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};


  const index = findClosestRepoIndexByName(originalGame, input);

  return (
    <div className='w-full mt-[26lvh] lg:mt-[32lvh] 2xl:mb-56 mb-20 h-80 md:h-96'>
      <div className='relative w-full text-center text-white 2xl:text-5xl text-3xl'>
        <h1>Similar Games</h1>
      </div>
      <div className='absolute mt-4 secondcarousel-container text-center w-full'>
        <Slider {...settings } className="w-full h-full">
          {originalGame[index]?.similar_games?.map((game) => (
            <div key={game.id} className="mb-3">
              <img
                onClick={(event) => {
                  if (!isDragging) {
                    botonPresionado(game.id, game.name, event);
                  }
                }}
                className="drop-shadow-xl shadow-xl rounded-md hover:mt-5 w-60 2xl:w-80 h-auto md:mx-1 mb-2 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 cursor-pointer duration-300"
                src={getResizedImageUrl(game.cover.url, 'cover_big')}
                alt={game.name}
              />
              <p className="text-white 2xl:text-3xl md:text-lg">{game.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
