import { useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

export const VideoBackground = ({movieId}) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
 
    useMovieTrailer(movieId);

    return (
        <div className="w-screen mt-4 md:mt-0">
            <iframe 
                className="w-screen aspect-video"
                src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"} 
                title="YouTube video player" 
            ></iframe>
        </div>
    )
}

