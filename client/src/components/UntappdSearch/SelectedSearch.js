import React, { useContext, useState } from 'react';
import { BeerContext } from '../Context/BeerProvider';
import styled, { keyframes } from 'styled-components';
import FormButton from '../Buttons/FormButton';
import { GiHops } from "react-icons/gi";


const SelectedSearch = ({ beer, results }) => {
  const {
    setSubmit,
    showResults,
    setShowResults
  } = useContext(BeerContext);
  const [status, setStatus] = useState('');
  const beerName = beer.name;
  const beerStyle = beer.style;
  const brewery = beer.brewery;
  const breweryLocation = beer.brewery_location;
  const abv = beer.abv;
  const untappdId = beer.untappd_id;
  const logo = beer.label_image_hd;
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch('/add/beer', {
      method: "POST",
      body: JSON.stringify({
        beerName, beerStyle, brewery,  breweryLocation, abv, untappdId, logo
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("data from post", json.data);
        setStatus("submitted");
        setSubmit(true);
      })
  }
  return (
    <>
      {beer && status === '' && showResults === false && (
        <Wrapper>
          <ImgWrapper>
          <Img src={beer.label_image} />
          </ImgWrapper>
          <TextWrapper>
            <TxtDiv> <Span>Name:</Span> {beer.name}</TxtDiv>
            <TxtDiv><Span>Brewery:</Span> {beer.brewery}</TxtDiv>
            <TxtDiv><Span>Location: </Span>{beer.brewery_location}</TxtDiv>
            <TxtDiv><Span>Style:</Span> {beer.style}</TxtDiv>
            <TxtDiv><Span>ABV:</Span> {beer.abv}</TxtDiv>
            <TxtDiv>{beer.description}</TxtDiv>
            <BtnWrapper>
              
            <FormButton onClick={(ev) => handleSubmit(ev)}>add beer</FormButton>
              <FormButton onClick={() => {
                setShowResults(true);
              }}>
                back to results</FormButton>
            </BtnWrapper>
          </TextWrapper>
            
        </Wrapper>
      ) }
      

      {status === 'submitted' && (
        <>
          <Div>Cheers! {beer.name} has been added. <HopSpan><GiHops className="hop" /></HopSpan></Div>
        </>  
      )}
    </>
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
  border-radius:20px;
  display: flex;
  width: 500px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
`;
const TextWrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 1rem;
`;

const BtnWrapper = styled.div`
  font-size: .8rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
`;

const ImgWrapper = styled.div`
`;

const Img = styled.img`
  width: 110px;
`;

const Div = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 50px;
`;

const TxtDiv = styled.div`
  padding: 5px;
`;

const Span = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;

export default SelectedSearch;
