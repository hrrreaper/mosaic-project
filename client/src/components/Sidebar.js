import React from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from './Button';
import logo from '../assets/Mosaic-graphic.png';

const Sidebar = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Link to='/'>
      <Logo src={logo} />
      </Link>
      <Button onClick={() => {
        history.push("/in-stock")
      }}>Kegs in stock</Button>
      <Button onClick={() => {
        history.push("/beers")
      }}>View All Beers</Button>
      <Button onClick={() => {
        history.push("/add/beer")
      }}>Add a beer</Button>
      <Button onClick={() => {
        history.push("/breweries")
      }}>View Breweries</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: fixed;
  float: left;
  height: 100vh;
  width: 200px;
  top: 0; 
  font-weight: 500;
  background-color: rgba(0,250,0,0.2);
`;

const Logo = styled.img`
  margin-top: 10px;
  width: 50px;
`;


export default Sidebar
