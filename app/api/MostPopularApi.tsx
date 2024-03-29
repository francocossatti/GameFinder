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

  // Primer llamado API
  const options1 = {
    method: 'POST',
    next: {
      revalidate: 2629800
    }, 
    headers: {
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      'Authorization': `Bearer ${process.env.API_BEARER_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    body: 'fields name,cover.url; sort follows desc; limit 5;',
  };

  const res = await fetch(apiUrl, options1);
  const data: GameInformation[] = await res.json();

  return (data);
}
