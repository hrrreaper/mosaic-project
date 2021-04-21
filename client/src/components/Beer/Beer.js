import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { BeerContext } from '../Context/BeerProvider';
import SmallButton from '../Buttons/SmallButton';
const { REACT_APP_API_ID } = process.env;

const Beer = ({ name, type, brewery, _id, tappedOn, tappedOut, tapOn, tapOut, beer }) => {
  const history = useHistory();
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + REACT_APP_API_ID).toString('base64');
  const {
    setUpdateTapOut,
    setUpdateTapOn,
  } = useContext(BeerContext);
  const [itemId, setItemId] = useState();
  const [idFlag, setIdFlag] = useState();

  const handleTapOn = (ev) => {
    
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
    ev.stopPropagation();
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
  
  const handleTapOut = (ev) => {
    
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
    ev.stopPropagation();
  }
  
  return (
    <Wrapper>
      <BeerBtn
        // to={`/beer/${_id}`}
        onClick={(ev) => {
        ev.stopPropagation();
        history.push(`/beer/${_id}`)
      }}>
        {tappedOn || tappedOut ? (
          <>
          <Td>{name}</Td>
          <TypeTd>{type}</TypeTd>
          <Td>{brewery}</Td>
          </>
        ) : (
          <>
          <NameTd>{name}</NameTd>
          <NameTd>{type}</NameTd>
          <NameTd>{brewery}</NameTd>
          <DateTd>{tapOn}</DateTd>
          <DateTd>{tapOut}</DateTd>
          </>
        )}
        {tappedOn && (
        <TapTd>
          
          <SmallButton onClick={(ev) => handleTapOn(ev)}>tap it</SmallButton>
          </TapTd>
        )}
        {tappedOut && (
        <TapTd>
          
          <SmallButton onClick={(ev) => handleTapOut(ev)}>tap out</SmallButton>
          </TapTd>
        )}
      </BeerBtn>
    </Wrapper>
  )
}

const TypeTd = styled.div`
  display: table-cell;
  text-align: left;
  width: 20vw;
  padding-right: 10px;

  @media (max-width: 500px) {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: .7rem;
    width:20vw;
  }
`;
const NameTd = styled.div`
  text-align: left;
  width: 18vw;
  display: table-cell;
  padding-right: 10px;
  
  @media (max-width: 768px) {
    font-size: .7rem;
    width: 20vw;
    overflow-wrap: break-word;
  }
  @media (max-width: 500px) {
    font-size: .6rem;
    width:20vw;
    overflow-wrap: break-word;
  }
`;

const DateTd = styled.div`
  display: table-cell;
  text-align: left;
  width: 10vw;
  overflow-wrap: break-word;
  padding-right: 10px;
  
  @media (max-width: 768px) {
    font-size: .7rem;
    width: 10vw;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;
const Td = styled.div`
  display: table-cell;
  text-align: left;
  width: 20vw;
  padding-right: 10px;
  
  @media (max-width: 768px) {
    font-size: .7rem;
    width: 25vw;
    overflow-wrap: break-word;
  }
  @media (max-width: 500px) {
    font-size: .6rem;
    width: 27vw;
    overflow-wrap: break-word;
  }
`;

const TapTd = styled.div`
  display: table-cell;
  text-align: left;
  width: 10vw;
  padding-right: 10px;
  
`;

const BeerBtn = styled.div`
  text-transform: lowercase;
  text-decoration: none;
  outline: none;
  color: black;
  background-color: transparent; 
  border: none;
  cursor: pointer;
  padding: 3px;
  margin: 3px 0;
  vertical-align: middle;
  font-size: .85rem;
`;

const Wrapper = styled.div`
  display: table-row;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: ease-in-out 500ms;
  line-height: 1.5;
  

  &:hover {
    font-weight: 700;
    transform: scale(1.02);
  }

  &:nth-child(even) {
    background-color: rgba(0, 250, 0, 0.1);
  }
`;

export default Beer;
