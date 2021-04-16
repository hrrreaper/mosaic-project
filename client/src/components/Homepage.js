import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Mosaic from '../assets/mosaictext.png';
import UntappdMenu from './UntappdMenu';


const Homepage = () => {
  const [menuInfo, setMenuInfo] = useState([]);
  
  useEffect(() => {
    fetch("/menu").then((res) => {
      res
        .json()
        .then((json) => {
          setMenuInfo(json.data.items);
        })
        .catch((err) => {
          console.log("ERROR",err.message)
        });
    });
  }, [])

  console.log("here",menuInfo)

  return (
    <Wrapper>
      <Title>
        <Img src={Mosaic} alt="mosaic" />
        <div>On Tap Now:</div>
      </Title>
      {menuInfo ? (
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
`;

const Img = styled.img`
  width: 300px;
`;

export default Homepage;
