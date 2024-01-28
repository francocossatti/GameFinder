'use server'

type GameInformation = {
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

export default async function searchSimilar(query: string) {
  const apiUrl = 'https://api.igdb.com/v4/games';

  // Primer llamado API
  const options1 = {
    method: 'POST',
    headers: {
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      'Authorization': `Bearer ${process.env.API_BEARER_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    body: `fields name, similar_games.name, similar_games.cover.url; where name ~ "${query}"*;
    sort rating desc; 
    limit 90;`,
  };

  const res = await fetch(apiUrl, options1);
  const data: GameInformation[] = await res.json();

  return (data);
}
