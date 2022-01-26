import MainHeader from '../components/MainHeader';
import List from '../components/List';
import { TravelBackground } from '../components/Backgrounds';
import { AttributionListPage, Links } from '../components/Footer';
import { demoListData } from './demoListData';
import { useListWithLocalStorage } from '../hooks/useListData';

const Demo = () => {
  const { listData, dispatchListAction } =
    useListWithLocalStorage(demoListData);

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
