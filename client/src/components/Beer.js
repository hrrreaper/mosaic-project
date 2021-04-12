import React from 'react';
import styled from 'styled-components';

const Beer = ({name, type, brewery, _id}) => {
  return (
    <Wrapper>
      <div>Beer: {name}</div>
      <div>Style: {type}</div>
      <div>Brewery: {brewery}</div>
      {/* //TODO add button to mark as tapped (will update database with current day for tappedOn)
      if tappedOn has a date but tapped off doesn't - add a button for "tapped out"
       */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 80px;
  width: 400px;
  margin: 20px 25px;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default Beer;
