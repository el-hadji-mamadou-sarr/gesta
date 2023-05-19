import React, { useState } from 'react';
import NavigationNavBar from '../../Component/navbar/NavigationNavBar';
import showPwdImg from './../../Assets/images/show-password.svg';
import hidePwdImg from './../../Assets/images/hide-password.svg';


function NewPassword() {

  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealConfPwd, setIsRevealConfPwd] = useState(false);
  const [pwd, setPwd] = useState('');
  const [confPwd, setConfPwd] = useState('');
  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("token");



  const handleSubmitNewPassword = (event) => {
    event.preventDefault();
    console.log(event.target.elements["new-password"].value.match("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}") === true);

    if (event.target.elements["new-password"].value.match("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}") !== true) {
      alert("Le mot de passe doit contenir au moins 8 caracteres, un en majuscule, un miniscule, une lettre et un symbole");
    } else if (event.target.elements["new-password"].value === event.target.elements["confirm-new-password"].value) {
      alert("Les 2 champs doivent être identiques");
    } else {
      fetch("http://localhost:5000/api/users/profile/update/password", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', },
        credentials: "include",
        body: JSON.stringify({ password: confPwd, token: token })
      }).then((response) => {
        if (response.status === 200) {
          alert("votre mot de passe a été mit à jour avec succès");
        }
      })
    }
  }


  return (
    <>
      <NavigationNavBar />
      <div className="w-1/2 mx-auto">
        <div>
          <div className="mt-24">
            <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmitNewPassword}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-new-password">
                    Nouveau mot de passe
                  </label>
                  <div className="flex">
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-new-password" type={isRevealPwd ? "text" : "password"} value={pwd} onChange={e => setPwd(e.target.value)} name="new-password" placeholder="Mot de passe" />
                    <img className="w-6 align-middle" title={isRevealPwd ? "Hide password" : "Show password"} src={isRevealPwd ? hidePwdImg : showPwdImg} onClick={() => setIsRevealPwd(prevState => !prevState)} alt="" />
                  </div>
                  <p className="text-gray-600 text-xs italic">Au moins 8 caracteres, un en majuscule, un miniscule, une lettre et un symbole</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-new-password">
                    Confirmation de mot de passe
                  </label>
                  <div className="flex">
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-confirm-new-password" type={isRevealConfPwd ? "text" : "password"} value={confPwd} onChange={e => setConfPwd(e.target.value)} name="confirm-new-password" placeholder="confirmation de mot de passe" />
                    <img className="w-6 align-middle" title={isRevealConfPwd ? "Hide password" : "Show password"} src={isRevealConfPwd ? hidePwdImg : showPwdImg} onClick={() => setIsRevealConfPwd(prevState => !prevState)} alt="" />
                  </div>
                  <p className="text-gray-600 text-xs italic">Rendez le aussi complexe que possible</p>
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

export default NewPassword;