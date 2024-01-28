import HomeSection from "@/components/HomeSection"
import RecommendSection from "@/components/RecommendSection"
import getNewGames from "./api/NewGamesApi";
import getPopularGames from "./api/MostPopularApi";
import Footer from "@/components/Footer";
import { Metadata } from 'next'

require('dotenv').config()
 
export const metadata: Metadata = {
  title: 'Game Finder',
  description: '...',
}

async function getRecommendedData(){
  const newGames = await getNewGames()
  const popularGames = await getPopularGames()
  return { newGames, popularGames };
}

export default async function Home() {
  const { newGames, popularGames } = await getRecommendedData();

  return (
    <main className="bg-gradient-to-tr from-black to-blue-900">
        <HomeSection />
        <RecommendSection popularGames={popularGames} newGames={newGames} />
        <Footer/>
    </main>
  )
}