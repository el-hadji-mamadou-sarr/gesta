import React from 'react';
import { Link } from 'react-router-dom';
import MenuAppBar from '../../Component/navbar/dashboard/MenuAppBar';
import NavigationNavBar from '../../Component/navbar/NavigationNavBar';

function ForgotPassword(props) {

  const handleSubmitForgotPassword = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/users/profile/update/resetPassword", {
      method: "POST",
      headers: { 'Content-Type': 'application/json',},
      credentials: "include",
      body: JSON.stringify({ email: event.target.email.value })
    }).then((response)=>{
      if(response.status===200){
        alert("l'email vous a été envoyé à "+event.target.email.value);
      }
    })
  }

  return (
    <>
      <NavigationNavBar />
      <div className="w-1/2 mx-auto">
        <div>
          <div className="mt-24">
            <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmitForgotPassword}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                    Entrez votre adresse email
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" name="email" placeholder="john@doe.com" />
                  <p className="text-gray-600 text-xs italic">Vous recevrez un lien de reinitialisation de votre mot de passe par mail</p>
                </div>
              </div>
              <div className="md:flex md:items-center mt-8">
                <div className="md:w-1/2 ">
                  <button className="shadow bg-blue-500 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                    Recuperer mon mot de passe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;