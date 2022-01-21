import MainHeader from '../MainHeader';
import List from '../List';
import { TravelBackground } from '../Backgrounds';
import { AttributionListPage, Links } from '../Footer';
import { demoListData } from './demoListData';
import { useListData } from '../useListData';

const Demo = () => {
  const { listData, dispatchListAction } = useListData(demoListData);

  return (
    <TravelBackground>
      <MainHeader />
      <List listData={listData} dispatchListAction={dispatchListAction} />
      <div style={{ marginTop: 'auto' }}>
        <Links />
        <AttributionListPage />
      </div>
    </TravelBackground>
  );
};

export default Demo;
