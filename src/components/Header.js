import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

export const Header = () => {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
        navigate("/browse");
      } else {
        dispatch(removeUser())
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {} 
      )
      .catch((error) => {
      navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  justify-between">
      <img className="w-44 mx-auto md:mx-0" alt="logo" src={LOGO}/>
      {user && (
        <div className="flex p-1 justify-between">
          {showGptSearch &&
            <select className="my-5 -mx-2 px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button className="text-md text-white font-semibold my-5 ml-0 md:mx-7 px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800" onClick={handleGptSearchClick}>{showGptSearch ? "Home" :" GPT Search"}</button>
          <img 
            className="hidden w-12 h-12 mt-4 rounded-lg"
            alt="userIcon"
            src= {user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-semibold px-1 md:p-2 rounded-lg my-4 ml-2 text-white bg-red-600 hover:bg-red-700">Sign Out</button>
        </div>
      )}
    </div>
  )
};