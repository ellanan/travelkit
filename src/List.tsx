import firebase from 'firebase/app';
import produce from 'immer';

import { useEffect, useMemo, useState } from 'react';

const db = firebase.firestore();

interface ListItem {
  name: string;
  id: string;
  checked: boolean;
}
interface Category {
  name: string;
  id: string;
  items: ListItem[];
}
interface ListData {
  name: string;
  categories: Category[];
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
    <div>
      <h2>{listData?.name}</h2>
      <div>
        <ol style={{ listStyleType: 'none', padding: 0 }}>
          {listData?.categories.map((category) => (
            <li key={category.id} className='card'>
              <h3>{`${category.name}:`}</h3>

              <button
                onClick={() => {
                  const newCategories = produce(
                    listData.categories,
                    (draftCategories) => {
                      const categoryToUpdate = draftCategories.find(
                        ({ id }) => id === category.id
                      );

                      if (!categoryToUpdate) {
                        throw new Error(
                          `Could not find item ${category.id}. This should be impossible`
                        );
                      }

                      categoryToUpdate.items.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: '.......',
                        checked: false,
                      });
                    }
                  );

                  listRef.update({
                    categories: newCategories,
                  });
                }}
              >
                +
              </button>
              {category.items.map((item) => {
                return (
                  <label key={item.id}>
                    <div>
                      <input
                        type='checkbox'
                        id={item.id}
                        checked={item.checked}
                        onChange={(e) => {
                          const newCategories = produce(
                            listData.categories,
                            (draftCategories) => {
                              const itemToUpdate = draftCategories
                                .find(({ id }) => id === category.id)
                                ?.items.find(({ id }) => id === item.id);

                              if (
                                !(itemToUpdate && 'checked' in itemToUpdate)
                              ) {
                                throw new Error(
                                  `Could not find item ${item.id}. This should be impossible`
                                );
                              }

                              itemToUpdate.checked = e.target.checked;
                            }
                          );
                          listRef.update({
                            categories: newCategories,
                          });
                        }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </label>
                );
              })}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default List;
