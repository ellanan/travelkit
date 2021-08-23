import React, { Fragment } from 'react';
import Typewriter from 'typewriter-effect';
import MainHeader from '../MainHeader';

import styled from 'styled-components/macro';
import type {} from 'styled-components/cssprop';

import { HomePageLinks } from '../Links';
import { useListData } from '../useListData';
import List from '../List';

const Home = () => {
  const { listData, dispatchListAction } = useListData();

  return (
    <Fragment>
      <MainHeader />
      <div
        css={`
          display: flex;
          @media (max-width: 800px) {
            flex-direction: column;
          }
        `}
      >
        <span
          css={`
            font-size: 50px;
            font-weight: bold;
            text-align: left;
            margin: 20px 40px;
            padding: 20px;
            @media (max-width: 800px) {
              font-size: 32px;
              font-weight: bold;
              text-align: center;
              margin: 10px 20px;
              padding: 10px;
            }
          `}
        >
          Have you packed the
          <Typewriter
            options={{
              strings: ['passport?', 'hand sanitizer?', 'phone charger?'],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
        <img
          src={require('../images/travel-checklist.jpg').default}
          alt='travel checklist'
          css={`
            width: 500px;
            height: 400px;
            @media (max-width: 800px) {
              width: 350px;
              height: 300px;
              margin-left: auto;
              margin-right: auto;
            } ;
          `}
        />
      </div>
      <List listData={listData} dispatchListAction={dispatchListAction} />
      <HomePageLinks />
    </Fragment>
  );
};

export default Home;
