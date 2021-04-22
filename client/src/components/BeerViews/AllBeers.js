import React, { useContext, useState } from 'react';
import styled, { keyframes } from "styled-components";
import Loading from '../Loading';
import { BeerContext } from '../Context/BeerProvider';
import Beer from '../Beer/Beer';
import Pagination from '../Pagination';
import { IoRocketOutline } from 'react-icons/io5';
import FilterBeer from '../Beer/FilterBeer';
import { v4 as uuidv4 } from 'uuid';



const AllBeers = () => {
  const {
    allBeers,
    filteredBeers,
    setFilteredBeers,
  } = useContext(BeerContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  //to limit the amount of posts shown per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBeers?.slice(indexOfFirstItem, indexOfLastItem);
  
  //Change page number
  const paginate = (number) => setCurrentPage(number);

  //unique beer count
  let uniqueBeers = [...new Set(allBeers?.map(item => item.beerName))];

  return (
    <>
      <FilterBeer />
    <Wrapper>
      <Title>
          all the beers we've had on tap
      </Title>
      <SubTitle>
        <SubTitleDiv>
          Total: {allBeers?.length}
        </SubTitleDiv>
        <SubTitleDiv>
          Unique: {uniqueBeers.length} 
        </SubTitleDiv>
      </SubTitle>
      {allBeers ? (
          <Table>
          
          <TableHeader>
          <Th>BEER</Th>
          <Th>STYLE</Th>
          <Th>BREWERY</Th>
          <TapTh>TAPPED</TapTh>
          <TapTh>TAPPED OUT</TapTh>
          </TableHeader>
            
            {currentItems?.map((beer, index) => {
    
        return <Beer
          key={uuidv4()}
          index={index}
          _id={beer._id}
          name={beer.beerName}
          brewery={beer.brewery}
          type={beer.beerStyle}
          tapOn={beer.tappedOn}
          tapOut={beer.tappedOut}
        />
      })}
          
          </Table>
      ) : (
      <Loading />
      )
      }
      <PagesDiv>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredBeers?.length}
          paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
      />
      </PagesDiv>
      </Wrapper>
      </>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Table = styled.div`
  display: table;
  margin: 10px;
  
`;

const PagesDiv = styled.div`
  margin-bottom: 30px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
  animation: ${fadeIn} ease 1.5s;

  @media (max-width: 768px) {
    font-size: .9rem;
  }
`;

const SubTitle = styled.h3`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 20px;
  text-transform: lowercase;
  animation: ${fadeIn} ease 2s;

  @media (max-width: 768px) {
    font-size: .7rem;
  }
`;

const SubTitleDiv = styled.div`
  margin-bottom: 5px;
`;

const TableHeader = styled.div`
  display: table-row;
  margin: 10px 0;
  display: flex;
  font-weight: 700;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: .8rem;
  }
`;

const Th = styled.div`
  display: table-cell;
  width: 18vw;
  text-align: left;

    @media (max-width: 768px) {
    font-size: .7rem;
    width: 21vw;
  }
`;
const TapTh = styled.div`
  display: table-cell;
  width: 10vw;
  text-align: left;

    @media (max-width: 768px) {
    display: none;
  }
`;


export default AllBeers;
