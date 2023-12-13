import { BG_URL } from "../utils/constants"
import { GptMovieSuggestions } from "./GptMovieSuggestions"
import { GptSearchBar } from "./GptSearchBar"

export const GptPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="h-screen object-cover md:h-full" src= {BG_URL}
          alt="background"
        />
      </div>
      <div className="pt-[40%] md:p-0"> 
        <GptSearchBar/>
        <GptMovieSuggestions/>
      </div>
    </div>
  )
}