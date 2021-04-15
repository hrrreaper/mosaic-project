import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';


const Beer = ({ name, type, brewery, _id, abv }) => {
  
  return (
    <Wrapper>
      <BeerLink to={`/beer/${_id}`} >
      <Div> {name} </Div> 
      <Div> {type} </Div>
      <Div> {brewery}</Div>
        {abv && (
          <AbvDiv> {abv}</AbvDiv>
        )}
        
      </BeerLink>
    </Wrapper>
  )
}

const Div = styled.div`
  text-transform: uppercase;
  font-size: .8rem;
  text-align: left;
  width: 20vw;
`;
const AbvDiv = styled.div`
  text-transform: uppercase;
  font-size: .8rem;
  text-align: left;
  width: 10vw;
`;

const BeerLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 80vw;
  margin: 10px 15px;
  padding: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: ease-in-out 500ms;

  &:hover {
    font-weight: 700;
    transform: scale(1.02);
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }

  &:nth-child(even) {
    background-color: rgba(0, 250, 0, 0.1);
  }
`;

export default Beer;
