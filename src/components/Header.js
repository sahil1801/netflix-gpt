import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

export const Header = () => {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

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
  }

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" alt="logo" src={LOGO}/>
      {user && (
        <div className="flex p-1">
          <img 
            className="w-12 h-12 mt-3 rounded-lg"
            alt="userIcon"
            src= {user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-semibold p-2 rounded-lg my-4 ml-2 text-white bg-red-700">Sign Out</button>
        </div>
      )}
    </div>
  )
};