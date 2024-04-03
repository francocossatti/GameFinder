'use server'

type GameInformation = {
  id: number;
  name: string;
  cover: {
    url: string;
  };
};

export default async function SearchApi(query: string) {
  const apiUrl = 'https://api.igdb.com/v4/games';

  const options1 = {
    method: 'POST',
    headers: {
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      'Authorization': `Bearer ${process.env.API_BEARER_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    body: `fields id,name, cover.url;
    where name ~ "${query}"*;
    sort rating desc; 
    limit 5;`,
  };

  const res = await fetch(apiUrl, options1);
  const data: GameInformation[] = await res.json();

  return (data);
}
