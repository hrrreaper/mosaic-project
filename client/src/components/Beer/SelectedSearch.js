import React, { useState } from 'react';
import styled from 'styled-components';

const SelectedSearch = ({ beer }) => {
  const [status, setStatus] = useState('');
  const beerName = beer.name;
  const beerStyle = beer.style;
  const brewery = beer.brewery;
  const abv = beer.abv;
  const untappdId = beer.untappd_id;
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch('/add/beer', {
      method: "POST",
      body: JSON.stringify({
        beerName, beerStyle, brewery, abv, untappdId
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("data from post", json.data);
        setStatus("submitted")
      })
  }
  return (
    <div>
      {status === '' && (
        <>
        <img src={beer.label_image} />
            <div>Name: {beer.name}</div>
            <div>Brewery: {beer.brewery}</div>
            <div>Style: {beer.style}</div>
            <div>ABV: {beer.abv}</div>
            <div>{beer.description}</div>
            
            <button onClick={(ev) => handleSubmit(ev)}>add beer</button>
        </>
      )}

      {status === 'submitted' && (
        <>
          <div>Cheers! {beer.name} has been added to the database.</div>
        </>  
      )}
    </div>
  )
}

export default SelectedSearch;
