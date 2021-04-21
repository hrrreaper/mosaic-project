import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled, { keyframes } from 'styled-components';
import Loading from '../Loading';
import UpdateForm from './UpdateForm';
import FormButton from '../Buttons/FormButton';
import moment from 'moment';
import { BeerContext } from '../Context/BeerProvider';
import { IoArrowBack } from "react-icons/io5";
import { GiHops } from "react-icons/gi";
const { REACT_APP_API_ID } = process.env;

const BeerDetails = () => {
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + REACT_APP_API_ID).toString('base64');
  const {
    updateTapOut,
    setUpdateTapOut,
    updateTapOn,
    setUpdateTapOn,
    updateDelete,
    setUpdateDelete,
    update,
    setSubmit
  } = useContext(BeerContext);

  const [beer, setBeer] = useState(undefined);
  const [status, setStatus] = useState("loading");
  const [itemId, setItemId] = useState();
  const [idFlag, setIdFlag] = useState(false);
  const { _id } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    if (_id) {
      fetch(`/beer/${_id}`)
        .then((res) => res.json())
        .then((json) => {
          setBeer(json.data);
          setStatus("idle");
        })
        .catch((err) => {
          setStatus("error");
          console.log("ERROR", err.message);
      })
    }
  }, [_id])
  
  const handleUpdate = () => {
    setStatus("edit");
  }

  const handleDelete = () => {
    fetch(`/beer/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((res) => res.json())
    .then((json) => {
      console.log("this beer has been deleted from the database");
      setSubmit(true);
    })
    .catch((err) => {
      console.log("ERROR", err.message);
    })
    setUpdateDelete(!updateDelete);
    history.goBack();
  }
  
  //first checking to see if the beer has an untappd id. If it does call untappd API and add it to our draft menu. Then update it in the DB with todays date as the tapped on date.
  const handleOnTap = () => {
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
          setUpdateTapOn(!updateTapOn);
          setIdFlag(!idFlag);
          console.log("get id from here", json.item.id)
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
        setUpdateTapOn(!updateTapOn);
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
    const diffInDays = diffInTime / (1000 * 3600 * 24) + 1;

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
        setUpdateTapOut(!updateTapOut);
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
          setUpdateTapOut(!updateTapOut);
        })
      .catch((err) => {
        console.log("ERROR", err.message);
        })
    }
  }

  useEffect(() => {
    fetch(`/beer/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        setBeer(json.data);
        setStatus("idle");
      })
      .catch((err) => {
        console.log("ERROR",err.message)
    })
  }, [updateTapOut, updateTapOn, update]);
  

  return (
    <Wrapper>
      {status === "idle" && (
        <>
          <BackDiv>
            <FormButton title="go back" onClick={() => history.goBack()}>
              <IoArrowBack size={19} />
              <GiHops className="hop" size={17} />
            </FormButton>
          </BackDiv>
        <Div>
          <Img src={beer.logo} />
          <Name> {beer.beerName}</Name>
          <Brewery> {beer.brewery} </Brewery>
          <Style>{beer.beerStyle} | <Abv>{beer.ABV}% abv </Abv></Style>
          {beer.breweryLocation && (
          <Style> <Span>Location:</Span> {beer.breweryLocation}</Style>
          )}
          {beer.tappedOn && (
          <Style> <Span>Tapped On:</Span> {beer.tappedOn}</Style>
          )}
          {beer.tappedOut && (
          <Style> <Span>Tapped Out:</Span> {beer.tappedOut}</Style>
          )}
          {beer.daysOnTap && beer.daysOnTap !== 0 && (
          <Days> <Span>Days on tap:</Span> {beer.daysOnTap}</Days>
          )}
          </Div>
        </>  
      )}
      <BtnDiv>
        {status === "idle" && (beer.tappedOn === "" || beer.tappedOn === null ) && (
          <FormButton onClick={() => handleOnTap()}>Tap it</FormButton>
        )}
        {status === "idle" && (beer.tappedOn !== null) && (beer.tappedOn !== "") && (beer.tappedOut === "" || beer.tappedOut === null) && (
          <FormButton onClick={() => handleTapOut()}>Tap Out</FormButton>
        )}
        {status === "idle" && (
          <>
            <FormButton onClick={() => handleUpdate()}>Edit</FormButton>
            <FormButton onClick={() => handleDelete()}>Delete</FormButton>
          </>
        )}
          </BtnDiv>
        
      
      {status === "loading" && (
        <Loading />
      )}
    
      {status === "edit" && (
        <UpdateForm beer={beer} />
      )}
    </Wrapper>
  )
}

const rock = keyframes`
  0% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(-15deg);
  }

  100% {
    transform: rotate(10deg);
  }
`;

const BackDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 225px;

  .hop {
    color: rgba(0,200,0,0.8);
    animation: ${rock} 2s ease-in-out forwards infinite;
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 125px;
  }
  @media (max-width: 500px) {
    left: 100px;
  }
`;

const Brewery = styled.div`
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-style: italic;
  
`;

const Style = styled.div`
  font-size: 1.1rem;
  margin-bottom: 10px;
  
`;

const Days = styled.div`
  font-size: 1rem;
`;

const Abv = styled.span`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;


const Img = styled.img`
  margin-right: 10px;
  margin-bottom: 10px;
  width: 100px;
  float: left;
`;


const Name = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-evenly;
`;

const Span = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;

const Div = styled.div`
  border-radius:20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: rgba(0, 250, 0, 0.1);
  padding: 20px;
  line-height: 1.5;
  width: 475px;
  text-align: right;

  @media (max-width: 768px) {
    width: 300px;
    margin-bottom: 15px;
    overflow-wrap: break-word;
  }

  @media (max-width: 400px) {
    width: 200px;
    margin-bottom: 10px;
    overflow-wrap: break-word;
  }
`;

const Wrapper = styled.div`
  width: 75vw;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;

export default BeerDetails;
