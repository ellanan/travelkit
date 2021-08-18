import React from 'react';
import Typewriter from 'typewriter-effect';
import MainHeader from '../MainHeader';
import { HomePageLinks } from '../Links';
import { useListData } from '../useListData';
import List from '../List';

const Home = () => {
  const { listData, dispatchListAction } = useListData();

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
          Have you packed the
          <Typewriter
            options={{
              strings: ['passport?', 'hand sanitizer?', 'phone charger?'],
              autoStart: true,
              loop: true,
            }}
          />
        </p>
        <img
          src={require('../images/travel-checklist.jpg').default}
          alt='travel checklist'
          style={{ width: '500px', height: '400px' }}
        />
      </div>
      <List listData={listData} dispatchListAction={dispatchListAction} />
      <HomePageLinks />
    </>
  );
};

export default Home;
