import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";
import Loading from './Loading';
import Mosaic from '../assets/mosaictext.png';
import untappd from '../assets/untappd.png';
import UntappdMenu from './UntappdMenu';
import moment from 'moment';
const { REACT_APP_API_ID } = process.env;

const Homepage = () => {
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + REACT_APP_API_ID).toString('base64');
  const [menuInfo, setMenuInfo] = useState([]);
  const [updatedInfo, setUpdatedInfo] = useState();
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
  useEffect(() => {
    fetch('https://business.untappd.com/api/v1/sections/610810', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": auth,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUpdatedInfo(json.section.updated_at)
        
      })
      .catch((err) => {
        console.log("ERROR", err.message);
      })
  }, []);

  const getDate = moment(updatedInfo).format("lll")

  return (
    <Wrapper>
      <Title>
        <Img src={Mosaic} alt="mosaic" />
      </Title>
      <Div>
        <UntappdImg src={untappd} alt="untappd logo" />
        <SubTitle>Untappd live feed
      <Date>last updated {getDate}</Date>
        </SubTitle>
      </Div>
      {menuInfo && status === "idle" ? (
        <>
              <Menu>
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
              </Menu>  
        </>
      ) : (
          <Loading />
      )
      }
      
    </Wrapper>
  )
};

const Menu = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: no-wrap;
  }
`;

const Wrapper = styled.div`
  max-width: 100vw;
  padding-bottom: 50px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
  animation: ${fadeIn} ease 1.5s;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


const SubTitle = styled.h2`
  text-align: left;
  font-size: 1.5rem;
  animation: ${fadeIn} ease 1.5s;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Date = styled.div`
  margin: 10px 0;
  text-align: left;
  font-size: .9rem;
  
  @media (max-width: 768px) {
    font-size: .75rem;
  }
`;

const Img = styled.img`
  width: 400px;
  

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

`;

const UntappdImg = styled.img`
  width: 70px;
  position: relative;
  top: -10px;
  left: -10px;
  animation: ${fadeIn} ease 1.5s;

  @media (max-width: 768px) {
    width: 40px;
    left: -5px;
    top: -10px;
  }
`;

export default Homepage;
