import React from 'react'
import styled from 'styled-components';

const Brewery = ({ brewery }) => {
  return (
    <Wrapper>
      <div>
        {brewery}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: 20px;
`;

export default Brewery;
