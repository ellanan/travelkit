import React from 'react';

import MainHeader from '../MainHeader';
import List from '../List';
import { TravelBackground } from '../Backgrounds';
import { ListPageLinks } from '../Links';
import { demoListData } from './demoListData';
import { useListData } from '../useListData';

const Demo = () => {
  const { listData, dispatchListAction } = useListData(demoListData);

  return (
    <TravelBackground>
      <MainHeader />
      <List listData={listData} dispatchListAction={dispatchListAction} />
      <ListPageLinks />
    </TravelBackground>
  );
};

export default Demo;
