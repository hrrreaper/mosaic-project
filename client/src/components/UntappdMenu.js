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
      <Abv>{abv}% abv </Abv>
      <Style>{style} </Style>
      <Info>{description} </Info>
      </BeerInfo>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 70vw;
  display: flex;
  padding: 15px;
  box-shadow: rgba(0, 250, 0, 0.3) 0px 2px 8px 0px;
`;

const ImgDiv = styled.div`
  margin-right: 10px;
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

    @media (max-width: 768px) {
    font-size: .8rem;
  }
  
`;

const Abv = styled.div`
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
  width: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default UntappdMenu;
