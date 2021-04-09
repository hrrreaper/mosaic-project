import React from 'react';
import styled from 'styled-components';

const Beer = ({name, type, brewery}) => {
  return (
    <Wrapper>
      <div>{name}</div>
      <div>{type}</div>
      <div>{brewery}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100px;
  width: 400px;
`

export default Beer;
