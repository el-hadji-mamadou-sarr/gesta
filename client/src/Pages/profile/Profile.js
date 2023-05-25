import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavigationNavBar from "../../Component/navbar/NavigationNavBar";


export default function Profile() {

  const [userInfos, setUserInfos] = useState({});
  const [formProfileErrors, setFormProfileErrors] = useState([]);
  const photoRef = useRef(null);
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch("http://localhost:5000/api/users/profile", { method: "GET", headers: { 'Content-Type': 'application/json', }, credentials: "include" })
      .then(response => { return response.json() }).then(data => {
        setUserInfos(data);
      })
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  function validate(data) {

  }

  function handleSubmitProfile(event) {
    event.preventDefault();
    /*    validate(event.target); */

    fetch("http://localhost:5000/api/users/profile/update", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ fullname: userInfos.fullname, email: userInfos.email })
    }).then(response => {
      if (response.status === 200) {
        setMessage("l'utilisateur a été enregistré");
      }
    })
  }

  function handleProfileFieldChange(event) {
    const { name, value } = event.target;

    setUserInfos((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  
  return <>
    <NavigationNavBar />
    <div className="w-1/2 mx-auto">
      <div>
        <div className="mt-24">
          <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmitProfile}>
            {/* upload image */}
            <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
              <input
                type="file"
                className="hidden"
                ref={photoRef}
                onChange={handlePhotoChange}
              />

              <div className="text-center">
                <div className={`mt-2 ${!photoPreview ? 'block' : 'hidden'}`}>
                  <img
                    src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                    className="w-40 h-40 m-auto rounded-full shadow"
                    alt="Current Profile"
                  />
                </div>

                <div className={`mt-2 ${photoPreview ? 'block' : 'hidden'}`}>
                  <span
                    className="block w-40 h-40 rounded-full m-auto shadow"
                    style={{
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundImage: `url('${photoPreview}')`,
                    }}
                  ></span>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                  onClick={() => photoRef.current.click()}
                >
                  Select New Photo
                </button>
              </div>
            </div>
            {/* upload image */}

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                {
                  message && <p>{message}</p>
                }
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Full name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="fullname"
                  value={userInfos.fullname}
                  onChange={handleProfileFieldChange}
                  placeholder="john Ndiaye" />

              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                  Email
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="email"
                  name="email"
                  value={userInfos.email}
                  onChange={handleProfileFieldChange}
                  placeholder="john@doe.com" />

                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
              </div>
            </div>
            <div className="md:flex md:items-center mt-8">
              <div className="md:w-3/4 ">
                <span className="font-bold py-2 px-4 rounded">
                  <Link className="underline hover:text-blue-800" to="/forgot-password">Reinitialiser mon mot de passe</Link>
                </span>
              </div>
              <div className="md:w-1/4 ">
                <button className="shadow bg-blue-500 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
}