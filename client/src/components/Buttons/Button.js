
import styled from 'styled-components'

const Button = styled.button`
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  font-size: 1rem;
  padding: 10px;
  margin: 15px 0;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  width: fit-content;
  text-align: center;
  border: none;
  background-image: linear-gradient(to right, #FDFC47 0%, rgba(0,250,0,0.8)  54%, #FDFC47  100%);
  background-size: 200%;
  transition: background-position .6s ease-in-out;
      

  &:hover {
    font-weight: 700;
    background-position: right center;
    text-decoration: none;
    transform: scale(1.05);
    box-shadow: 3px 3px 5px -2px rgba(0,200,0,0.7);
  }

`;

export default Button