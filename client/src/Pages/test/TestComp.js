import React, { useEffect } from 'react';

const ExampleComponent = () => {


  useEffect(() => {
    fetch("http://localhost:5000/api/projects/member", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
  }
    , [])
  return (
    <></>
  );
};

export default ExampleComponent;
