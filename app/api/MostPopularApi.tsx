'use server'

type GameInformation = {
  id: number;
  name: string;
  cover: {
    url: string;
  };
};

export default async function getPopularGames() {
  const apiUrl = 'https://api.igdb.com/v4/games';

  const options1 = {
    method: 'POST',
    next: {
      revalidate: 3600
    }, 
    headers: {
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      'Authorization': `Bearer ${process.env.API_BEARER_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    body: 'fields name,cover.url; where themes.name != "Erotic"; sort follows desc; limit 7;',
  };

  const res = await fetch(apiUrl, options1);
  const data: GameInformation[] = await res.json();

  return (data);
}
