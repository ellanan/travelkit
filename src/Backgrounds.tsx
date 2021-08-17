import styled from 'styled-components';

export const TravelBackground = styled.div`
  height: 100%;
  background-image: url(${require('./images/travel-stickers.jpg').default});
  background-color: #ffffff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.97;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const TravelCheckList = styled.div`
  height: 100%;
  background-image: url(${require('./images/travel-checklist.jpg').default});
  background-color: #ffffff;
  background-size: 600px 400px;
  background-position: right;
  background-repeat: no-repeat;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
