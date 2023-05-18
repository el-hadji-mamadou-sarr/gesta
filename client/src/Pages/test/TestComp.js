import React, { useState, useRef } from 'react';

const ExampleComponent = () => {
  const photoRef = useRef(null);
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
      <input
        type="file"
        className="hidden"
        ref={photoRef}
        onChange={handlePhotoChange}
      />

      <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
        Profile Photo <span className="text-red-600"> </span>
      </label>

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
  );
};

export default ExampleComponent;
