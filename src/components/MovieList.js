import { MovieCard } from "./MovieCard";

export const MovieList = ({title, movies}) => {

    return (
        <div className="px-6">
            <h1 className="py-4 text-3xl text-white">{title}</h1>
            <div className="flex overflow-x-scroll no-scrollbar ">
                <div className="flex">
                    {movies?.map((movie) => (<MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))}       
                </div>
            </div>
        </div>
    )
}