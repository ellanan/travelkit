import { ChakraProvider } from '@chakra-ui/react';
import styled from 'styled-components/macro';
import Lists from './Lists';

function App() {
  return (
    <ChakraProvider>
      <TravelBackground>
        <Lists />
        <Attribution />
      </TravelBackground>
    </ChakraProvider>
  );
}

const Attribution = () => (
  <a
    href='https://www.freepik.com/vectors/travel'
    style={{
      color: '#333',
      position: 'absolute',
      bottom: '1em',
      left: '1em',
      fontSize: '10px',
      textDecoration: 'none',
      opacity: 0.4,
      fontFamily: 'sans-serif',
    }}
  >
    Travel vector created by rawpixel.com - www.freepik.com
  </a>
);

const TravelBackground = styled.div`
  height: 100%;
  background-image: url(${require('./images/travel-stickers.jpg').default});
  background-color: #ffffff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.97;
`;

export default App;
