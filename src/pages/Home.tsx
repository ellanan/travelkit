import React from 'react';
import { TravelCheckList } from '../Backgrounds';
import MainHeader from '../MainHeader';
import { HomePage } from '../Links';

const Welcome = () => {
  return (
    <TravelCheckList>
      <MainHeader />
      <HomePage />
    </TravelCheckList>
  );
};

export default Welcome;
