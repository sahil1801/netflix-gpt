import { useSelector } from "react-redux";
import {MovieList} from "./MovieList";

export const GptMovieSuggestions = () => {

    const { movieNames, movieResults} = useSelector((store) => store.gpt);
    if(!movieNames) return null;

    return(
        <div className="bg-black text-white p-4 mx-4 my-7  bg-opacity-90">
            <div>
                {movieNames.map((movieName, index) => (
                    <MovieList 
                        key={movieName} 
                        title={movieName} 
                        movies={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    )
}