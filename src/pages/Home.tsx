import React from 'react';
import MainHeader from '../MainHeader';
import { HomePageLinks } from '../Links';

const Welcome = () => {
  return (
    <>
      <MainHeader />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            textAlign: 'left',
            margin: '20px',
            padding: '20px',
          }}
        >
          Have you packed the ....?
        </p>
        <img
          src={require('../images/travel-checklist.jpg').default}
          alt='travel checklist'
          style={{ width: '500px', height: '400px' }}
        />
      </div>
      <HomePageLinks />
    </>
  );
};

export default Welcome;
