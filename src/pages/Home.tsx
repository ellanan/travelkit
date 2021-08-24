import React, { Fragment } from 'react';
import Typewriter from 'typewriter-effect';
import MainHeader from '../MainHeader';

// eslint-disable-next-line
import styled from 'styled-components/macro';
import type {} from 'styled-components/cssprop';

import { HomePageLinks } from '../Links';
import { useListData } from '../useListData';
import List from '../List';
import { demoListData } from './demoListData';

const Home = () => {
  const { listData, dispatchListAction } = useListData(demoListData);

  return (
    <Fragment>
      <MainHeader />
      <div
        css={`
          display: flex;
          position: relative;
          @media (max-width: 800px) {
            flex-direction: column;
          }
        `}
      >
        <span
          css={`
            font-size: clamp(32px, 6vw, 72px);
            line-height: 1.5;
            font-weight: bold;
            text-align: left;
            margin: 20px 40px;
            padding: 20px;
            position: absolute;
            @media (max-width: 800px) {
              font-size: 32px;
              font-weight: bold;
              text-align: center;
              margin: 10px 20px;
              padding: 10px;
              position: static;
              .hide-for-mobile {
                display: none;
              }
            }
            .Typewriter {
              white-space: nowrap;
            }
          `}
        >
          Have you <br className='hide-for-mobile' /> packed the
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
          width='6416'
          height='5000'
          css={`
            width: 50%;
            height: auto;
            margin-left: auto;
            object-fit: contain;
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
