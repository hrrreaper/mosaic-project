
import styled from 'styled-components'

const Button = styled.button`
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  font-weight: 700;
  font-size: .75rem;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--primary-color);

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: var(--accent-color);
  }
`;

export default Button