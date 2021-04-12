
import styled from 'styled-components'

const Button = styled.button`
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
  font-weight: 400;
  font-size: .9rem;
  border: none;
  margin: 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;
  width: 150px;
  height: 50px;
  text-align: center;
  /* box-shadow: 0 0 5px #eee; */
  background-image: linear-gradient(to right, #FDFC47 0%, #24FE41  54%, #FDFC47  100%);
  background-size: 200% auto;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-position: right center; 
    text-decoration: none;
    transform: scale(1.1);
    font-weight: 700;
    box-shadow: 3px 3px 5px -2px rgba(0,200,0,0.7); 
  }
`;

export default Button