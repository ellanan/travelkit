import React, { Fragment } from 'react';
import Typewriter from 'typewriter-effect';
import { ArrowRightIcon } from '@chakra-ui/icons';

import MainHeader from '../MainHeader';
import { HomePageLinks } from '../Links';
import { useListData } from '../useListData';
import List from '../List';
import { demoListData } from './demoListData';

// eslint-disable-next-line
import styled from 'styled-components/macro';
import type {} from 'styled-components/cssprop';

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
      <div
        css={`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-left: auto;
          margin: 20px 70px;
          padding: 20px;
          font-size: 1.5em;
          font-weight: bold;
          text-align: center;
          @media (max-width: 800px) {
            margin: 10px 20px;
            padding: 10px;
            font-size: 12px;
          }
        `}
      >
        Sign up/Login <ArrowRightIcon boxSize='0.5rem' />
        Build your kit <ArrowRightIcon boxSize='0.5rem' />
        Pack everything <ArrowRightIcon boxSize='0.5rem' />
        Ready to travel
      </div>
      <List listData={listData} dispatchListAction={dispatchListAction} />
      <img
        src={require('../images/travel-people.jpg').default}
        alt='travel people'
        width='6416'
        height='5000'
        css={`
          height: auto;
          margin-left: auto;
          object-fit: contain;
          @media (max-width: 800px) {
            width: auto;
            height: auto;
            margin-left: auto;
            margin-right: auto;
          } ;
        `}
      />
      <HomePageLinks />
    </Fragment>
  );
};

export default Home;
