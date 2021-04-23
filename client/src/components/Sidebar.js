import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/Mosaic-graphic.png';
import { IoBeerOutline } from 'react-icons/io5';

const Sidebar = () => {

  return (
    <Wrapper>
      <Nav to='/'>
      <Logo src={logo} alt="logo"/>
      </Nav>
      <StyledLink to='/add/beer'>
        <Div>
        <IconSpan>
          <BeerIcon className="beer" size={18}/>
        </IconSpan>
        Add a beer
        </Div>
      </StyledLink>

      <StyledLink to='/in-stock'>
        <Div>
        <IconSpan>
          <BeerIcon className="beer" size={18}/>
        </IconSpan>
        in stock
        </Div>
      </StyledLink>

      <StyledLink to='/on-tap'>
        <Div>
      <IconSpan>
          <BeerIcon className="beer" size={18} />
        </IconSpan>
      on Tap
        </Div>
      </StyledLink>

      <StyledLink to='/beers/1'>
        <Div>
        <IconSpan>
          <BeerIcon className="beer" size={18}/>
        </IconSpan>
        All Beers
        </Div>
      </StyledLink>

      <StyledLink to='/breweries'>
        <Div>
        <IconSpan>
          <BeerIcon className="beer" size={17}/>
        </IconSpan>
        Breweries
        </Div>
      </StyledLink>
    </Wrapper>
  )
}

const Div = styled.div`
  flex-direction: row;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  float: left;
  height: 110vh;
  width: 180px;
  top: 0;
  background-color: rgba(0,250,0,0.1);

  @media (max-width: 768px) {
    width: 110px;
  }

  @media (max-width: 500px) {
    width: 85px;
  }
`;

const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  height: fit-content;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  color: #000;
  margin: 20px 0;
  margin-left: 20px;
  padding-bottom: 10px;
  width: fit-content;

    @media (max-width: 768px) {
    margin-left: 10px;
    font-size: .7rem;
    display: flex;
    flex-direction: column;
    align-items: center; 
  }

  @media (max-width: 500px) {
    margin-left: 5px;
    font-size: .55rem;
  }
  
  &.active {
    color: rgba(0,200,0,0.8);

    .beer{
    transform: rotate(50deg);
    color: gold;
    }
  }

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 3px;
    background: rgba(0,200,0,0.8);
    transition: width ease-out .5s;
    margin-top: 5px;
  }

  &:hover::after {
    width: 100%;
    }

  &:hover {
    color: rgba(0,200,0,0.8);
    
    .beer{
    transform: rotate(50deg);
    color: gold;
    }
  }

`;

const IconSpan = styled.span`
  margin-right: 5px;
`;

const BeerIcon = styled(IoBeerOutline)`
  transition: ease-in-out .4s;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Nav = styled(NavLink)`
  text-align: center;
`;

const Logo = styled.img`
  margin-top: 10px;
  margin-bottom: 30px;
  width: 75px;

  @media (max-width: 768px) {
    width: 35px;
  }
`;


export default Sidebar
