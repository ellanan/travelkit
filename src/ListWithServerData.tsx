import { Redirect } from 'react-router-dom';
import List from './List';
import { useListWithServerData } from './useListData';
import { useSessionContext } from './useSessionContext';

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
