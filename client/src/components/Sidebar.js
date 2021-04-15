import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/Mosaic-graphic.png';
import { Icon } from 'react-icons-kit'
import { beer } from 'react-icons-kit/typicons/beer';
import { IoBeerOutline } from 'react-icons/io5';


const Sidebar = () => {

  return (
    <Wrapper>
      <Nav to='/'>
      <Logo src={logo} alt="logo"/>
      </Nav>
      <StyledLink to='/on-tap'>
      <IconSpan>
          <BeerIcon className="beer" size={17} />
        </IconSpan>
      Beers on Tap
      </StyledLink>
      <StyledLink to='/in-stock'>
        <IconSpan>
          <BeerIcon className="beer" size={17}/>
        </IconSpan>
        Beers in stock
      </StyledLink>
      <StyledLink to='/beers'>
        <IconSpan>
          <BeerIcon className="beer" size={17}/>
        </IconSpan>
        View All Beers
      </StyledLink>
      <StyledLink to='/breweries'>
        <IconSpan>
          <BeerIcon className="beer" size={17}/>
        </IconSpan>
        View All Breweries
      </StyledLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  float: left;
  height: 100vh;
  width: 215px;
  top: 0;
  background-color: rgba(0,200,0,0.1);
`;

const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: .85rem;
  text-decoration: none;
  color: #000;
  margin: 20px 0;
  margin-left: 15px;
  padding-bottom: 10px;
  width: fit-content;
  
  &.active {
    color: rgba(0,200,0,0.7);

    .beer{
    transform: rotate(50deg);
    color: goldenrod;
    }
  }

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 3px;
    background: rgba(0,200,0,0.7);
    transition: width ease-out .5s;
    margin-top: 5px;
  }

  &:hover::after {
    width: 100%;}

  &:hover {
    color: rgba(0,200,0,0.7);
    
    .beer{
    transform: rotate(50deg);
    color: goldenrod;
    }
  }

`;

const IconSpan = styled.span`
  margin-right: 5px;
`;

const BeerIcon = styled(IoBeerOutline)`
  transition: ease-in-out .4s;
`;

const Nav = styled(NavLink)`
  text-align: center;
`;

const Logo = styled.img`
  margin-top: 10px;
  margin-bottom: 30px;
  width: 70px;
`;


export default Sidebar
