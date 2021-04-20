import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Mosaic from '../assets/mosaictext.png';
import UntappdMenu from './UntappdMenu';
const { REACT_APP_API_ID } = process.env;

const Homepage = () => {
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + REACT_APP_API_ID).toString('base64');
  const [menuInfo, setMenuInfo] = useState([]);
  const [status, setStatus] = useState('loading');
  
  useEffect(() => {
    fetch('https://business.untappd.com/api/v1/sections/610810/items', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": auth,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setMenuInfo(json.items);
        setStatus('idle');
      })
      .catch((err) => {
        console.log("ERROR", err.message);
      })
  }, []);

  return (
    <Wrapper>
      <Title>
        <Img src={Mosaic} alt="mosaic" />
        <div>On Tap Now:</div>
      </Title>
      {menuInfo && status === "idle" ? (
        <>
          {menuInfo.map((beer) => {
            return (
              <UntappdMenu
                key={beer.id}
                name={beer.name}
                img={beer.label_image}
                brewery={beer.brewery}
                abv={beer.abv}
                style={beer.style}
                description={beer.description}
                tapped={beer.updated_at}
              /> 
            )
          })}
        </>
      ) : (
          <Loading />
      )
      }
      
    </Wrapper>
  )
};

const Wrapper = styled.div`
  height: 100vh;
  max-width: 100vw;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Img = styled.img`
  width: 300px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

export default Homepage;
