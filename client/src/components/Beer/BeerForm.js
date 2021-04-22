import React, { useState, useContext } from 'react';
import { BeerContext } from '../Context/BeerProvider';
import styled, { keyframes } from 'styled-components';
import FormButton from '../Buttons/FormButton';
import { GiHops } from "react-icons/gi";

const BeerForm = () => {
  const {
    setSubmit,
  } = useContext(BeerContext);
  const [beerName, setBeerName] = useState();
  const [beerStyle, setBeerStyle] = useState();
  const [brewery, setBrewery] = useState();
  const [abv, setAbv] = useState();
  const [kegSize, setKegSize] = useState();
  const [delivery, setDelivery] = useState();
  const [status, setStatus] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch('/add/beer', {
      method: "POST",
      body: JSON.stringify({
        beerName, beerStyle, brewery, abv, kegSize, delivery, 
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log( json.data);
        setStatus("submitted");
        setSubmit(true);
      })
  };
  
  return (
    <Wrapper>
      {status === "" && (
        <Form onSubmit={(ev) => handleSubmit(ev)}>
      <H2>or fill out the form below to add a beer</H2>
      <Required>fields marked with * are required</Required>
      <Label htmlFor="beerName">* Beer Name:</Label>
      <Input
        type="text"
        id="beerName"
        name="beerName"
        required
        onChange={(ev) => {
          setBeerName(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="brewery">* Brewery:</Label>
      <Input
        type="text"
        id="brewery"
        name="brewery"
        required
        onChange={(ev) => {
          setBrewery(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="beerStyle">* Style:</Label>
      <Input
        type="text"
        id="beerStyle"
        name="beerStyle"
        required
        onChange={(ev) => {
          setBeerStyle(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="abv">* ABV:</Label>
      <Input
        type="text"
        id="abv"
        name="abv"
        required
        onChange={(ev) => {
          setAbv(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="kegSize">Keg Size:</Label>
      <Input
        type="text"
        id="kegSize"
        name="kegSize"
        onChange={(ev) => {
          setKegSize(ev.target.value);
        }}
      ></Input>
          <Label htmlFor="delivery">Delivery Date:</Label>
      <Input
        type="text"
        id="delivery"
        name="delivery"
        onChange={(ev) => {
          setDelivery(ev.target.value);
        }}
      ></Input>

        <FormButton type="submit" >Submit</FormButton>
        </Form>
      )}

      {status === "submitted" && (
        <Div>Cheers! That beer's been added to the database. <HopSpan><GiHops className="hop" /></HopSpan></Div>
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

const HopSpan = styled.span`
  color: rgba(0,200,0,0.7);

  .hop {
  animation: ${rock} 2s ease-in-out forwards infinite;
  }
`;

const Wrapper = styled.div`
  margin: auto;
  width: 75vw;

    @media (max-width: 768px) {
    margin-left: 20px;
  } 
`;

const Required = styled.div`
  margin-bottom: 20px;
  font-size: .75rem;
`;

const Div = styled.div`
  margin-top: 100px;
  text-align: center;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 200px;
  align-items: flex-start;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 7px;
  width: 350px;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  outline: none;

  @media (max-width: 768px) {
    width: 200px;
  }
  
`;

const Label = styled.label`
  text-transform: uppercase;
  width: 350px;
  font-weight: 700;
  text-align: left;
  margin: 10px 0;
  font-size: .9rem;

    @media (max-width: 768px) {
    font-size: .7rem;
  }
  
`;

const H2 = styled.h2`
  margin: 20px 0;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  } 
`;

export default BeerForm;
