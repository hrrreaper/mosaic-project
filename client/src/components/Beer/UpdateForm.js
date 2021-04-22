import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import BeerDetails from './BeerDetails';
import FormButton from '../Buttons/FormButton';
import { BeerContext } from '../Context/BeerProvider';

const UpdateForm = ({ beer }) => {
  const {
    setUpdate,
  } = useContext(BeerContext);
  const [beerName, setBeerName] = useState(beer.beerName);
  const [beerStyle, setBeerStyle] = useState(beer.beerStyle);
  const [brewery, setBrewery] = useState(beer.brewery);
  const [abv, setAbv] = useState(beer.ABV);
  const [kegSize, setKegSize] = useState(beer.kegSize);
  const [tappedOn, setTappedOn] = useState(beer.tappedOn);
  const [tappedOut, setTappedOut] = useState(beer.tappedOut);
  const [daysOnTap, setDaysOnTap] = useState(beer.daysOnTap);
  const [btnText, setBtnText] = useState("Update");
  const [status, setStatus] = useState("");
  const { _id } = useParams();
  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(`/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        brewery, beerName, beerStyle, abv, tappedOn, tappedOut, kegSize, daysOnTap
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setBtnText("Updated!");
        setStatus("edited");
        setUpdate(true);
      })
  };

  return (
    <Wrapper>
    {status === "" && (
      <Form>
      <H2>Update beer:</H2>
      <Label htmlFor="beerName">Beer Name:</Label>
      <Input
        type="text"
        id="beerName"
        name="beerName"
        value={beerName || ''}
        onChange={(ev) => {
          setBeerName(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="brewery">Brewery:</Label>
      <Input
        type="text"
        id="brewery"
        name="brewery"
        value={brewery || ''}
        onChange={(ev) => {
          setBrewery(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="beerStyle">Style:</Label>
      <Input
        type="text"
        id="beerStyle"
        name="beerStyle"
        value={beerStyle || ''}
        onChange={(ev) => {
          setBeerStyle(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="abv">ABV:</Label>
      <Input
        type="text"
        id="abv"
        name="abv"
        value={abv || ''}
        onChange={(ev) => {
          setAbv(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="kegSize">Keg Size:</Label>
      <Input
        type="text"
        id="kegSize"
        name="kegSize"
        value={kegSize || ''}
        onChange={(ev) => {
          setKegSize(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="tapped">Tapped On:</Label>
      <Input
        type="text"
        id="tapped"
        name="tapped"
        value={tappedOn || ''}
        onChange={(ev) => {
          setTappedOn(ev.target.value);
        }}
      ></Input>
      <Label htmlFor="tappedOut">Tapped Out:</Label>
      <Input
        type="text"
        id="tappedOut"
        name="tappedOut"
        value={tappedOut || ''}
        onChange={(ev) => {
          setTappedOut(ev.target.value);
        }}
          ></Input>
        <Label htmlFor="daysOnTap">Days on Tap:</Label>
      <Input
        type="text"
        id="daysOnTap"
        name="daysOnTap"
        value={daysOnTap || ''}
        onChange={(ev) => {
          setDaysOnTap(ev.target.value);
        }}
          ></Input>
          
        <BtnDiv>
          <FormButton type="submit" onClick={(ev) => handleSubmit(ev)}>{btnText}</FormButton>
            
          <FormButton type="submit" onClick={() => history.goBack()}>Cancel</FormButton>

        </BtnDiv>

          
    </Form>
      )}
      
      {status === "edited" && (
        <>
          <div>
            <BeerDetails />
          </div>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0px 250px;
  font-size: 1rem;
`;

const Label = styled.label`
  text-transform: uppercase;
  width: 350px;
  font-weight: 700;
  text-align: left;
  font-size: .9rem;
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 7px;
  width: 300px;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  outline: none;
`;

const H2 = styled.h2`
  margin: 20px 0;
  font-size: 1.5rem;
`;

export default UpdateForm;
