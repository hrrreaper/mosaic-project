import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import Loading from '../Loading';
import Button from '../Button'
import { BeerContext } from '../BeerProvider';
import Beer from './Beer';
import Pagination from '../Pagination';

const AllBeers = () => {
  const {
      allBeers,
  } = useContext(BeerContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  //to limit the amount of posts shown per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allBeers?.slice(indexOfFirstItem, indexOfLastItem);
  
  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper>
      <Title>
        All the beers we've had on tap. Current count: {allBeers?.length}
      </Title>
      {allBeers ? (
        <>
          <DivTitle>
          <Div>BEER</Div>
          <Div>STYLE</Div>
          <Div>BREWERY</Div>
          </DivTitle>
      {currentItems.map((beer, index) => {
        return <Beer
          key={index}
          _id={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
        />
      })}
        <BtnDiv>
        </BtnDiv>
          </>
      ) : (
      <Loading />
      )
      }
      <PagesDiv>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={allBeers?.length}
        paginate={paginate}
      />
      </PagesDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 75vw;
  margin: auto;
`;

const PagesDiv = styled.div`
  margin-bottom: 30px;
`;


const BtnDiv = styled.div`
  margin: 0 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  margin: 20px;
`;

const DivTitle = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Div = styled.div`
  width: 20vw;
  text-align: left;
`;


export default AllBeers;
