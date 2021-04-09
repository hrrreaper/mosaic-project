import React from "react";
import { Icon } from "react-icons-kit";
import { loader } from "react-icons-kit/feather/loader";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Div>
      <SpinIcon icon={loader} size={25} />
    </Div>
  );
};

const Div = styled.div`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinIcon = styled(Icon)`
  animation: ${spin} 1000ms infinite;
`;

export default Loading;