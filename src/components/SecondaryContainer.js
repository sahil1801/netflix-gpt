import { useSelector } from "react-redux"
import { MovieList } from "./MovieList"


export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
 
  return (
    movies && (
      <div className=" bg-black">
        <div className="-mt-72 pl-11 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
        <MovieList title={"Popular"} movies={movies.popularMovies}/>
        <MovieList title={"Upcoming"} movies={movies.comingMovies}/>
        </div>
      </div>
    )
  )
}