
import styled from 'styled-components'

const Button = styled.button`
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  padding: 10px;
  margin: 15px 0;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  width: fit-content;
  text-align: center;
  border: none;
  background-color: rgba(0,250,0,0.7);
  background-size: 200%;
      transition: background-position .4s ease-in-out,
        background-image .2s linear;
      transition-delay: 0.0s, 0.5s;

  &:hover {
    background-image: linear-gradient(to right, #FDFC47 0%, #24FE41  54%, #FDFC47  100%);
    text-decoration: none;
    transform: scale(1.03);
    box-shadow: 3px 3px 5px -2px rgba(0,200,0,0.7);
    background-position: -90% 100%;
  }

`;

export default Button