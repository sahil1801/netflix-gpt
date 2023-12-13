import { useDispatch, useSelector } from "react-redux"
import { lang } from "../utils/languageConstants"
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";


export const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            'https://api.themoviedb.org/3/search/movie?query=' + 
            movie +
            '&include_adult=false&language=en-US&page=1', API_OPTIONS
        )

        const json = await data.json();
        return json.results;

    }

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);
        // Make an API call to GPT API and get Movie Results

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + "only gives me names of 5 movies, comma seperated like the example result given ahead. Example Results: Gadar, Golmal, Sholay, Don, Koi Mil Gaya ";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });
        console.log(gptResults.choices?.[0]?.message?.content);  
        // Andaz Apna Apna, Chupke Chupke, Padosan, Jaane Bhi Do Yaaro, Amar Akbar Anthony

        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        // [Andaz Apna Apna, Chupke Chupke, Padosan, Jaane Bhi Do Yaaro, Amar Akbar Anthony]

        // For each Movie I will search TMDB API
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        //   [Promise,Promise,Promise,Promise,Promise]

        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults); 

        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    }

    return(
        <div className="pt-[10%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-md bg-opacity-80" 
                onSubmit={(e) => e.preventDefault()}
            >
                <input 
                    ref={searchText}
                    type="text" 
                    className="p-4 m-3 text-lg rounded-md col-span-9 hover:bg-gray-800 hover:text-white"   
                    placeholder= {lang[langKey].gptSearchPlaceholder}/>
                <button className="bg-red-600 hover:bg-red-700 py-2 px-4 m-3 text-white col-span-3 text-lg rounded-lg font-semibold" 
                onClick={handleGptSearchClick}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}