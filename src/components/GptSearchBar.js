import { useSelector } from "react-redux"
import { lang } from "../utils/languageConstants"

export const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);

    return(
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12">
                <input type="text" className="p-4 m-3 text-lg rounded-md col-span-9" placeholder= {lang[langKey].gptSearchPlaceholder}/>
                <button className="bg-red-600 py-2 px-4 m-3 text-white col-span-3 rounded-lg font-semibold">{lang[langKey].search}</button>
            </form>
        </div>
    )
}