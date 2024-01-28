'use server'

type GameInformation = {
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
  

export default async function searchSpecificGame(query: string) {
  const apiUrl = 'https://api.igdb.com/v4/games';

  // Primer llamado API
  const options1 = {
    method: 'POST',
    headers: {
      'Client-ID': 'gs1lb9y1c0zgzvul8u6ppc8otr2k21',
      'Authorization': 'Bearer pcoiyysd1mhel7wp779bvzw04xvxog',
      'Content-Type': 'text/plain',
    },
    body: `fields name, cover.url, summary, screenshots.url, genres.name; where name ~ "${query}"*;
    sort rating desc; 
    limit 90;`,
  };

  const res = await fetch(apiUrl, options1);
  const data: GameInformation[] = await res.json();

  return (data);
}