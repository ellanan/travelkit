import MainHeader from '../components/MainHeader';
import List from '../components/List';
import { AttributionListPage, Links } from '../components/Footer';
import { demoListData } from './demoListData';
import { useListWithLocalStorage } from '../hooks/useListData';

const Demo = () => {
  const { listData, dispatchListAction } =
    useListWithLocalStorage(demoListData);

  return (
    <>
      <img
        src={require('../images/travel-stickers.jpg')}
        alt=''
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(2px)',
          opacity: 0.4,
          zIndex: -1,
        }}
      />
      <MainHeader />
      <List listData={listData} dispatchListAction={dispatchListAction} />
      <div style={{ marginTop: 'auto' }}>
        <Links />
        <AttributionListPage />
      </div>
    </>
  );
};

export default Demo;
