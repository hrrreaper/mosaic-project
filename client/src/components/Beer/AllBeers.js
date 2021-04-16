import React, { useContext, useState } from 'react';
import styled from "styled-components";
import Loading from '../Loading';
import { BeerContext } from '../BeerProvider';
import Beer from './Beer';
import Pagination from '../Pagination';
import { IoRocketOutline } from 'react-icons/io5';
import SearchBar from './SearchBar'

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

  //unique beer count
  let uniqueBeers = [...new Set(allBeers?.map(item => item.beerName))];

  return (
    <Wrapper>
      <SearchBar />
      <Title>
        All the beers we've had on tap.
      </Title>
      <SubTitle>
        <SubTitleDiv>
          Total: {allBeers?.length}
        </SubTitleDiv>
        <SubTitleDiv>
          Unique: {uniqueBeers.length} <IoRocketOutline />
        </SubTitleDiv>
      </SubTitle>
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

const Title = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  margin: 10px;
`;

const SubTitle = styled.h3`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 20px;
  text-transform: lowercase;
`;

const SubTitleDiv = styled.div`
  margin-bottom: 5px;
`;

const DivTitle = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.3rem;
`;

const Div = styled.div`
  width: 20vw;
  text-align: left;
`;


export default AllBeers;
