import React, {useContext, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { BeerContext } from '../Context/BeerProvider';
import Loading from '../Loading';
const { REACT_APP_MAP_ID } = process.env;

const Breweries = () => {
  const {
      allBeers,
  } = useContext(BeerContext);

  const [value, setValue] = useState();
  const [status, setStatus] = useState(false);
  let uniqueBreweries = [...new Set(allBeers?.map(item => item.brewery))];
  const sortedBreweries = uniqueBreweries.sort();

  let uniqueBeers = [...new Set(allBeers?.map(beer => {
    if (beer.brewery === value) {
      return beer.beerName;
    }
  }))];
    

  return (
    <>
      <DivTitle>
        Breweries
      </DivTitle>
      <SubTitle>
        unique breweries: {uniqueBreweries.length}
      </SubTitle>
      <SubTitle>
        Select a brewery to view details.
      </SubTitle>
    <Wrapper>
      {allBeers ? (
        <>
        <Select
          value={value} 
          onChange={(ev) => {
            setValue(ev.target.value);
              }}
          onClick={() => {
            if (value === "select a brewery" || value === undefined) {
              setStatus(false);
            } else {
              setStatus(true);
            }
          }}
            >
          <option defaultValue="select a brewery">select a brewery</option>
        {sortedBreweries.map((brewery, index) => {
        return (
          <option
            value={brewery}
            key={uuidv4()}
          >
            {brewery}
        </option>
        )
      })}
      </Select>
          </>
      ) : (
      <Loading />
      )}

        {status === true && (
        <DetailsWrapper>
          <iframe
          width="500"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_MAP_ID}
          &q=${value}`}>
          </iframe>
            
            <BeerList>
              <SubTitle>Beers we've had on draught from this brewery:</SubTitle>

              {uniqueBeers.map((beer) => {
                return <Beer key={uuidv4()} >{beer}</Beer>
              })}
            </BeerList>
        </DetailsWrapper>  
      )}
        
    </Wrapper>
  </>
  )
};

const Select = styled.select`
  width: 35vw;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 1rem;
  border: 1px solid grey;
  border-radius: 5px;

  option {
    font-size: .85rem;
    color: #000;
  }

  @media (max-width: 768px) {
    height: 25px;
    font-size: .8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailsWrapper = styled.div`
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const BeerList = styled.div`
  margin-left: 20px;
  line-height: 2;
  display: flex;
  flex-direction: column;
`;

const Beer = styled.div`
  font-size: .8rem;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;


const DivTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  animation: ${fadeIn} ease 1.5s;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SubTitle = styled.h3`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  margin: 10px 0;
  animation: ${fadeIn} ease 1.5s;

  @media (max-width: 768px) {
    font-size: .7rem;
  }
`;


export default Breweries;
