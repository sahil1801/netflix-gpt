import { IMG_CDN_URL } from "../utils/constants"

export const MovieCard = ({posterPath}) => {
    return (
        <div className="w-48 px-2">
            <img alt="Movie Card" src={IMG_CDN_URL + posterPath}/>
        </div>
    )
}