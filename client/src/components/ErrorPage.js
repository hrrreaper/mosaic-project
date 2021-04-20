import React from 'react';
import styled from 'styled-components';


const ErrorPage = () => {
  return (
    <Wrapper>
      Oops! Something went wrong. Please refresh and try again.
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export default ErrorPage
