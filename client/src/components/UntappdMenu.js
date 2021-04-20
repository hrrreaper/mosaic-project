import React from 'react';
import styled from 'styled-components';

const UntappdMenu = ({ name, brewery, abv, img, style, description, tapped }) => {
  
  return (
    <Wrapper>
      <ImgDiv>
      <Img src={img} alt={name} />
      </ImgDiv>
      <BeerInfo>
      <Name>{name}</Name>
      <Brewery> {brewery} </Brewery>
      <Style>{style} | <Abv>{abv}% abv </Abv></Style>
      <Info>{description} </Info>
      </BeerInfo>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  margin: 20px 10px;
  width: 300px;
  padding: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (max-width: 768px) {
    display: flex;
    width: 70vw;
  }
`;

const ImgDiv = styled.div`
  margin-right: 10px;
  float: left;

`;

const Name = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: .9rem;
  }
  
`;
const Brewery = styled.div`
  font-size: .9rem;
  margin-bottom: 10px;
  font-style: italic;

    @media (max-width: 768px) {
    font-size: .8rem;
  }
  
`;

const Abv = styled.span`
  font-size: .85rem;
  margin-bottom: 10px;

    @media (max-width: 768px) {
    font-size: .75rem;
  }
  
`;

const Info = styled.div`
  font-size: .85rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: .75rem;
  }
`;

const Style = styled.div`
  font-size: .85rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: .75rem;
  }
`;

const BeerInfo = styled.div`
  flex-direction: column;
`;

const Img = styled.img`
  width: 100px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default UntappdMenu;
