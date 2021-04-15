import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Div>
      <Ul>
        {pageNumbers.map(number => (
            <StyledLink
              onClick={() => paginate(number)}
            to={`/beers/${number}`}
          >
            <Li key={number} >{number}</Li>
          </StyledLink>
          
        ))}
      </Ul>
    </Div>
  )
}

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-size: .8rem;
  width: 22px;
  margin: 20px 5px 30px 5px;

  &:hover {
    text-decoration: underline;
    font-weight: 700;
  }

  &.active {
    text-decoration: underline;
    font-weight: 700;
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }
`;

const Div = styled.div`
  display: block;
  width: 80vw;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
`;

const Li = styled.li`
  text-decoration: none;
  border: 1px solid lightgray;
  padding: 3px;
  width: 22px;
  text-align: center;

  &:hover{
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }
`;

export default Pagination;