import { Redirect } from 'react-router-dom';
import List from './components/List';
import { useListWithServerData } from './hooks/useListData';
import { useSessionContext } from './hooks/useSessionContext';

export const ListWithServerData = ({ id }: { id: string }) => {
  const { listData, dispatchListAction } = useListWithServerData({
    listId: id,
  });

  const { isLoggedIn } = useSessionContext();
  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  return <List listData={listData} dispatchListAction={dispatchListAction} />;
};
