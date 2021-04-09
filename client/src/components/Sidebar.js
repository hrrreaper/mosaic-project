import React from 'react';
import styled from "styled-components";

const Sidebar = () => {
  return (
    <Wrapper>
      <div>This is the sidebar</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  position: fixed;
  float: left;
  height: 100vh;
  width: 185px;
  z-index: 1; 
  top: 0; 
  font-weight: 500;
  background-color: var(--accent-color);
  box-shadow: 3px 3px 6px -3px rgba(0,0,0,0.7); 
  
`;

export default Sidebar
