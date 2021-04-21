import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }
  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, pageNumbers.length));
  }


  return (
    <Div>
      <Ul>
        <StyledNavLink
          onClick={() => prev()}
          to={`/beers/${Math.max(currentPage - 1, 1)}`}
        >
          <NavLi key={uuidv4()} >Prev</NavLi>
        </StyledNavLink>
      
        {pageNumbers.map(number => (
          <StyledLink
            key={uuidv4()}
            onClick={() => paginate(number)}
            to={`/beers/${number}`}
          >
            <Li key={uuidv4()} >{number}</Li>
          </StyledLink>
        ))}
        <StyledNavLink
          onClick={() => next()}
          to={`/beers/${Math.min(currentPage + 1, pageNumbers.length)}`}
        >
          <NavLi key={uuidv4()} >Next</NavLi>
          </StyledNavLink>
      </Ul>
    </Div>
  )
}


const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-size: .8rem;
  width: 22px;
  height: fit-content;
  margin: 10px 5px;

  &:hover {
    text-decoration: underline;
    font-weight: 700;
  }

  &.active {
    text-decoration: underline;
    font-weight: 700;
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }

  @media (max-width: 768px) {
    margin: 5px;
    font-size: .7rem;
  }
`;

const Div = styled.div`
  display: block;
  width: 75vw;
  margin-bottom: 50px;
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
const NavLi = styled.li`
  
  text-decoration: none;
  border: 1px solid lightgray;
  padding: 3px;
  width: fit-content;
  text-align: center;

  &:hover{
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-size: .8rem;
  width: fit-content;
  margin: 10px 5px;

  &:hover {
    text-decoration: underline;
    font-weight: 700;
  }

  &.active {
    text-decoration: underline;
    font-weight: 700;
    box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
  }

  @media (max-width: 768px) {
    margin: 5px;
    font-size: .7rem;
  }
  `;

export default Pagination;