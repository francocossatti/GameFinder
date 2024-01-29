"use client"
import Link from 'next/link';
import React from 'react';

type Repo = {
  id: number;
  name: string;
  cover: {
    url: string;
  };
};

export default async function RecommendSection({ newGames, popularGames }: { newGames: Repo[], popularGames: Repo[] }) {

  // Función para obtener la URL con el tamaño deseado
  const getResizedImageUrl = (url: string, size: string) => {
    const hash = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.png`;
  };

  // Puedes devolver JSX que muestre información en tu componente
  return (
      <div className="mx-full text-center">
        <h1 className="text-3xl font-semibold mb-6 2xl:text-4xl text-white">Popular</h1>
        <ul className='flex justify-center'>
          {popularGames.map((game, index) => (
            <div key={game.id} className={`flex-shrink-0 mx-1 md:mx-2 mb-4 ${index === 0 ? 'ml-0' : ''} ${index < 3 ? '' : 'hidden md:block'}`}>
              <Link href={`/${game.name.replace(/ /g, '-').replace(/:/g, '').toLowerCase()}`}>
              <img
                className="drop-shadow-xl shadow-xl rounded-md w-28 2xl:w-72 md:w-60 h-auto mx-auto mb-2 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                src={getResizedImageUrl(game.cover.url, 'cover_big')}
                alt={game.name}
              />
              </Link>
            </div>
          ))}
        </ul>
        <h1 className="text-3xl font-semibold mb-6 2xl:text-4xl text-white">Tendence</h1>
        <ul className='flex justify-center'>
          {newGames.map((game, index) => (
            <div key={game.id} className={`flex-shrink-0 mx-1 md:mx-2 mb-4 ${index === 0 ? 'ml-0' : ''} ${index < 3 ? '' : 'hidden md:block'}`}>
              <Link href={`/${game.name.replace(/ /g, '-').replace(/:/g, '').toLowerCase()}`}>
              <img
                className="drop-shadow-xl shadow-xl rounded-md w-28 2xl:w-72 md:w-60 h-auto mx-auto mb-2 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                src={getResizedImageUrl(game.cover.url, 'cover_big')}
                alt={game.name}
              />
              </Link>
            </div>
          ))}
        </ul>
      </div>
  );  
}