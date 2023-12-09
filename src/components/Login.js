import { useRef, useState } from "react";
import { Header } from "./Header";
import { checkValidData, checkValidData2 } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {BACKGROUND, USER_AVATAR} from "../utils/constants";

export const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const handleButtonClick = () => {
    
    if(!isSignInForm){
      const message = checkValidData2(email.current.value, password.current.value, fullName.current.value);
      setErrorMessage(message);

      if(message) return;

      if(!isSignInForm) {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: fullName.current.value, photoURL: {USER_AVATAR}
            }).then(() => {
                const {uid,email ,displayName,photoURL} = auth.currentUser;
                dispatch(
                  addUser({
                    uid:uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                  })
                )
            }).catch((error) => {
                setErrorMessage(error.message);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
    else{
      const message = checkValidData(email.current.value, password.current.value);
      setErrorMessage(message);
      if(message) return;

      if(isSignInForm){
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
    
  }

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src= {BACKGROUND}
          alt="background"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 
          className="text-white font-semibold py-5 text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input 
            ref={fullName} type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-800 rounded-md"
          />)}
        <input 
          ref={email} type="email" placeholder="Email Address" className="p-3 my-4 w-full bg-gray-800 rounded-md"
        />
        <input 
          ref={password} type="password" placeholder="Passward" className="p-3 my-4 w-full bg-gray-800 rounded-md"
        />
        <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
        <button className="p-3 my-6 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sing Up"}
        </button>
        <p className="py-5 cursor-pointer" onClick={toggleSignIn}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Alreday registered? Sign In Now."} </p>
      </form>
  </div>);
};
