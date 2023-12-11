import { Header } from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { MainContainer } from "./MainContainer";
import { SecondaryContainer } from "./SecondaryContainer";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { GptPage } from "./GptPage";
import { useSelector } from "react-redux";

export const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return <div>
    <Header/>
    {showGptSearch ? 
    (<GptPage/>)
      :
    (
      <>
        <MainContainer/>
        <SecondaryContainer/>
      </>
    )
    }     
  </div>;
};
