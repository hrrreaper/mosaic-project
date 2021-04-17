
import styled from 'styled-components'

const FormButton = styled.button`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  font-weight: 400;
  font-size: .80rem;
  border: none;
  margin: 15px 0;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;
  width: fit-content;
  height: 25px;
  text-align: center;
  background-image: linear-gradient(to right, #FDFC47 0%, #24FE41  54%, #FDFC47  100%);
  background-size: 200% auto;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-position: right center; 
    text-decoration: none;
    font-weight: 700;
    box-shadow: 3px 3px 5px -2px rgba(0,200,0,0.7); 
  }
`;

export default FormButton