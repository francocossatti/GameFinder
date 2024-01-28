import SimilarGames from "@/components/similarGames";
import GameInfo from "@/components/gameInfo";
import searchSpecificGame from "../api/SearchGameApi";
import searchSimilar from "../api/SearchSimilarGamesApi";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function capitalizeFirstLetters(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function createGameInfo(game: string) {
  let gameInfo = await searchSpecificGame(game);
  let similars = await searchSimilar(game);

  if (gameInfo.length === 0) {
    const words = game.split(' ');
    words.pop(); // Elimina la última palabra del array
    game = words.join(' '); // Reconstruye el string sin la última palabra
    gameInfo = await searchSpecificGame(game);
  }

  if (similars.length === 0) {
    const words = game.split(' ');
    words.pop(); // Elimina la última palabra del array
    game = words.join(' '); // Reconstruye el string sin la última palabra
    similars = await searchSimilar(game);
  }

  return { gameInfo, similars };
}

export default async function Home({
  params: { game },
}: {
  params: {
    game: string;
  };
}) {
  const formattedGame = game.replace(/-/g, ' ');
  const getFirstTwoWords = (formattedGame: string): string => {
    const words = formattedGame.split(' ');
    const result = words.slice(0, 2).join(' ');
    return result;
  };
  const firstTwoWords = getFirstTwoWords(formattedGame);

  const {gameInfo , similars} = await createGameInfo(firstTwoWords)

  const capitalizedTitle = capitalizeFirstLetters(formattedGame);

  return (
    <main className="bg-gradient-to-l from-black to-gray-800">
      <Header/>
      <title>{capitalizedTitle}</title>
      <GameInfo gameInfo={gameInfo} input={formattedGame}/>
      <SimilarGames originalGame={similars} input={formattedGame} />
      <Footer/>
    </main>
  )
}
