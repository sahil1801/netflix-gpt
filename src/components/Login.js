import React, { useState } from "react";
import { Header } from "./Header";

export const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background"/>
      </div>
      <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="text-white font-semibold py-5 text-3xl">{isSignInForm ? "Sign In" : "Sing Up"}</h1>
        {!isSignInForm && (<input type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-800 rounded-md"/>)}
        <input type="email" placeholder="Email Address" className="p-3 my-4 w-full bg-gray-800 rounded-md"/>
        <input type="password" placeholder="Passward" className="p-3 my-4 w-full bg-gray-800 rounded-md"/>
        <button className="p-3 my-6 bg-red-700 w-full rounded-md">{isSignInForm ? "Sign In" : "Sing Up"}</button>
        <p className="py-5 cursor-pointer" onClick={toggleSignIn}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Alreday registered? Sign In Now."} </p>
      </form>
  </div>);
};
