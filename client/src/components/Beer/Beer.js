import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { BeerContext } from '../Context/BeerProvider';
import SmallButton from '../SmallButton';
const { REACT_APP_API_ID } = process.env;

const Beer = ({ name, type, brewery, _id, tappedOn, tapOut, beer }) => {
  const history = useHistory();
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + REACT_APP_API_ID).toString('base64');
  const {
    setUpdateTapOut,
    setUpdateTapOn,
  } = useContext(BeerContext);
  const [itemId, setItemId] = useState();
  const [idFlag, setIdFlag] = useState();

  const handleTapOn = () => {
    if (beer.untappdId) {
      fetch('https://business.untappd.com/api/v1/sections/610810/items', {
        method: "POST",
        body: JSON.stringify({
          "untappd_id": beer.untappdId
        }),
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": auth,
      },
      })
        .then((res) => res.json())
        .then((json) => {
          setItemId(json.item.id);
          setUpdateTapOn(true);
          setIdFlag(true);
        })
      .catch((err) => {
        console.log("ERROR", err.message);
      })
    }
  
    fetch(`/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        brewery: beer.brewery,
        beerName: beer.beerName,
        beerStyle: beer.beerStyle,
        breweryLocation: beer.breweryLocation,
        abv: beer.ABV,
        tappedOn: moment().format('ll'),
        tappedOut: beer.tappedOut,
        kegSize: beer.kegSize,
        daysOnTap: beer.daysOnTap,
        itemId: itemId,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUpdateTapOn(true);
      })
    .catch((err) => {
      console.log("ERROR", err.message);
    })
  }

  //when you handleOnTap gets called try to save the item id to the database
  //NOT WORKING RIGHT NOW
  useEffect(() => {
    if (beer && itemId) {
      fetch(`/update/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          brewery: beer.brewery,
          beerName: beer.beerName,
          beerStyle: beer.beerStyle,
          breweryLocation: beer.breweryLocation,
          abv: beer.ABV,
          tappedOn: moment().format('ll'),
          tappedOut: beer.tappedOut,
          kegSize: beer.kegSize,
          daysOnTap: beer.daysOnTap,
          itemId: itemId,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("should only run when handleOnTap is called", json.data);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        })
    }
  }, [idFlag]);
  
  const handleTapOut = () => {
    //calculate the number of days the beer has been on tap///
    const tapDate = new Date(beer.tappedOn);
    const tapOutDate = new Date(moment().format("ll"));
    const diffInTime = tapOutDate.getTime() - tapDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    fetch(`/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        brewery: beer.brewery,
        beerName: beer.beerName,
        beerStyle: beer.beerStyle,
        breweryLocation: beer.breweryLocation,
        abv: beer.ABV,
        tappedOn: beer.tappedOn,
        tappedOut: moment().format('ll'),
        kegSize: beer.kegSize,
        daysOnTap: diffInDays,
        itemId: beer.itemId,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("data from post", json.data);
        setUpdateTapOut(true);
      })
    .catch((err) => {
      console.log("ERROR",err.message)
    })
    
    if (beer.untappdId && beer.itemId) {
      //if the beer has an untappd id delete it from the menu /// not working yet
      const id = beer.itemId;
      fetch(`https://business.untappd.com/api/v1/items/${id}`, {
        method: "DELETE",
        headers: {
        "Authorization": auth,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setUpdateTapOut(true);
        })
      .catch((err) => {
        console.log("ERROR", err.message);
        })
    }
  }
  
  return (
    <Wrapper>
      <BeerBtn onClick={(ev) => {
        ev.stopPropagation();
        history.push(`/beer/${_id}`)
      }}>
      <Div>{name}</Div> 
      <Div>{type}</Div>
      <Div>{brewery}</Div>
      </BeerBtn>
        {tappedOn && (
        <TapDiv>
          
          <SmallButton onClick={() => handleTapOn()}>tap on</SmallButton>
          </TapDiv>
        )}
        {tapOut && (
        <TapDiv>
          
          <SmallButton onClick={() => handleTapOut()}>tap out</SmallButton>
          </TapDiv>
        )}
    </Wrapper>
  )
}

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid grey;

    &:hover {
    text-transform: uppercase;
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }
`;

const Div = styled.div`
  text-transform: uppercase;
  font-size: .8rem;
  text-align: left;
  width:23vw;
`;

const TapDiv = styled.div`
  text-transform: uppercase;
  font-size: .8rem;
  text-align: left;
  width: 20vw;
`;

const BeerBtn = styled.button`
  text-decoration: none;
  outline: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 80vw;
  margin: 10px;
  padding: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: ease-in-out 500ms;

  &:hover {
    font-weight: 700;
    transform: scale(1.02);
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }

  &:nth-child(even) {
    background-color: rgba(0, 250, 0, 0.1);
  }
`;

export default Beer;
