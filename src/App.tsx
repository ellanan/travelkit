import { ChakraProvider } from '@chakra-ui/react';
import styled from 'styled-components/macro';
import Lists from './Lists';
import Links from './Links';

function App() {
  return (
    <ChakraProvider>
      <TravelBackground>
        <Lists />
        <Links />
      </TravelBackground>
    </ChakraProvider>
  );
}

const TravelBackground = styled.div`
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

export default App;
