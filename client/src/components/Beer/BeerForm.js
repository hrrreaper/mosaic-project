import React, { useState } from 'react';
import styled from 'styled-components';
import FormButton from '../FormButton';
import UntappdSearch from './UntappdSearch.js.js';

const BeerForm = () => {
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
        console.log("data from post", json.data);
        setStatus("submitted")
      })
  };
  
  return (
    <Wrapper>
      <UntappdSearch />
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
        <Div>Cheers! That beer's been added to the database.</Div>
      )}

    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: auto;
`;

const Required = styled.div`
  margin-bottom: 20px;
  font-size: .75rem;
`;

const Div = styled.div`
  margin-top: 100px;
  text-align: center;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 7px;
  width: 350px;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  outline: none;
`;

const Label = styled.label`
  text-transform: uppercase;
  width: 350px;
  font-weight: 700;
  text-align: left;
`;

const H2 = styled.h2`
  margin: 20px 0;
  font-size: 1.2rem;
`;


export default BeerForm;
