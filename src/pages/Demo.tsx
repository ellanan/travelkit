import MainHeader from '../components/MainHeader';
import List from '../components/List';
import { TravelBackground } from '../Backgrounds';
import { AttributionListPage, Links } from '../components/Footer';
import { demoListData } from './demoListData';
import { useListData } from '../hooks/useListData';

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
