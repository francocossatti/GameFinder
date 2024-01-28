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

  // Primer llamado API
  const options1 = {
    method: 'POST',
    headers: {
      'Client-ID': 'gs1lb9y1c0zgzvul8u6ppc8otr2k21',
      'Authorization': 'Bearer pcoiyysd1mhel7wp779bvzw04xvxog',
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
