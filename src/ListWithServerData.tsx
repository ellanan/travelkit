import List from './List';
import { useListWithServerData } from './useListData';

export const ListWithServerData = ({ id }: { id: string }) => {
  const { listData, dispatchListAction } = useListWithServerData({
    listId: id,
  });
  return <List listData={listData} dispatchListAction={dispatchListAction} />;
};
