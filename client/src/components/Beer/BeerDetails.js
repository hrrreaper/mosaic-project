import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import Loading from '../Loading';
import UpdateForm from '../UpdateForm';
import FormButton from '../FormButton';
import moment from 'moment';
import { BeerContext } from '../BeerProvider';

const BeerDetails = () => {
  const {
      updateTapOut,
      setUpdateTapOut,
      updateTapOn,
      setUpdateTapOn,
  } = useContext(BeerContext);

  const [beer, setBeer] = useState(undefined);
  const [status, setStatus] = useState("loading");
  const { _id } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    fetch(`/beer/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        setBeer(json.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
    })
  }, [])
  
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
      console.log("this beer has been deleted from the database")
    })
    history.push("/beers")
  }
  
  const handleOnTap = () => {
    fetch(`/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        brewery: beer.brewery,
        beerName: beer.beerName,
        beerStyle: beer.beerStyle,
        abv: beer.ABV,
        tappedOn: moment().format('ll'),
        tappedOut: beer.tappedOut,
        kegSize: beer.kegSize,
        daysOnTap: beer.daysOnTap,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setUpdateTapOn(true)
      })
  }

  const handleTapOut = () => {
    fetch(`/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        brewery: beer.brewery,
        beerName: beer.beerName,
        beerStyle: beer.beerStyle,
        abv: beer.ABV,
        tappedOn: beer.tappedOn,
        tappedOut: moment().format('ll'),
        kegSize: beer.kegSize,
        daysOnTap: beer.daysOnTap,
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
  }

  useEffect(() => {
    fetch(`/beer/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        setBeer(json.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
    })
  }, [updateTapOn, updateTapOut]);
  
  

  return (
    <Wrapper>
      {status === "idle" && (
          <Div>
          <div> <Span>Beer:</Span> {beer.beerName}</div>
          <div> <Span>Style:</Span> {beer.beerStyle}</div>
          <div> <Span>Brewery:</Span> {beer.brewery}</div>
          <div> <Span>ABV:</Span> {beer.ABV}</div>
          <div> <Span>Tapped:</Span> {beer.tappedOn}</div>
          <div> <Span>Tapped Out:</Span> {beer.tappedOut}</div>
          <div> <Span>Days on tap:</Span> {beer.daysOnTap}</div>
          </Div>
      )}
      <BtnDiv>
        {status === "idle" && (beer.tappedOn === "" || beer.tappedOn === null ) && (
          <FormButton onClick={() => handleOnTap()}>On Tap</FormButton>
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
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 35px;
  line-height: 1.5;
  width: fit-content;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;

export default BeerDetails;
