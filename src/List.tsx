import firebase from 'firebase/app';
import { useEffect, useMemo, useState } from 'react';
import classes from './List.module.css';

const db = firebase.firestore();

interface ListItem {
  name: string;
  id: string;
  category: string;
  checked: boolean;
}
interface ListData {
  name: string;
  items: ListItem[];
}

const List = ({ id }: { id: string }) => {
  const [listData, setListdata] = useState<ListData | null>(null);
  const listRef = useMemo(() => db.collection('lists').doc(id), [id]);

  useEffect(() => {
    listRef.onSnapshot({
      next: (newDocData) => {
        // @ts-ignore
        setListdata(newDocData.data());
      },
      error: (error) => {
        console.error(error);
      },
    });
  }, [listRef]);

  return (
    <div className={classes.card}>
      <h3>{listData?.name}</h3>
      <ol style={{ listStyleType: 'none', padding: 0 }}>
        {listData?.items.map((item) => (
          <li key={item.id}>
            {`${item.category}:`}
            <label>
              <input
                type='checkbox'
                id={item.id}
                checked={item.checked}
                onChange={(e) => {
                  const newItems = listData.items.map((x) => {
                    if (x.id !== item.id) return x;
                    return {
                      ...x,
                      checked: e.target.checked,
                    };
                  });
                  listRef.update({
                    items: newItems,
                  });
                }}
              />

              <span>{item.name}</span>
            </label>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default List;
