import { useEffect, useMemo, useReducer, useState } from 'react';

import firebase from 'firebase/app';
import produce from 'immer';

export interface ListItem {
  name: string;
  id: string;
  checked: boolean;
}

interface Category {
  name: string;
  id: string;
  items: ListItem[];
  color?: string | undefined;
}

export interface ListData {
  categories?: Category[];
}

const randomId = () => Math.random().toString(36).substr(2, 9);

type ListDataAction =
  | {
      type: 'setListData';
      listData: ListData;
    }
  | {
      type: 'setListCategories';
      categories: Category[];
    }
  | {
      type: 'createNewCategory';
      categoryName: string;
    }
  | {
      type: 'removeCategory';
      categoryId: string;
    }
  | {
      type: 'addItemInCategory';
      categoryId: string;
      itemName: string;
    }
  | {
      type: 'removeItemInCategory';
      categoryId: string;
      itemId: string;
    }
  | {
      type: 'setItemInCategoryChecked';
      categoryId: string;
      itemId: string;
      checked: boolean;
    }
  | {
      type: 'setItemInCategoryName';
      categoryId: string;
      itemId: string;
      name: string;
    }
  | {
      type: 'setCategoryName';
      categoryId: string;
      name: string;
    }
  | {
      type: 'setCategoryColor';
      categoryId: string;
      color: string;
    }
  | {
      type: 'setCategoriesItems';
      categoriesItems: Array<{ categoryId: string; items: ListItem[] }>;
    };

export const useListData = (initialListData: ListData | null) => {
  const [listData, dispatchListAction] = useReducer(
    (
      currentState: ListData | null,
      action: ListDataAction
    ): ListData | null => {
      switch (action.type) {
        case 'setListData':
          return action.listData;
        case 'setListCategories':
          return {
            ...currentState,
            categories: action.categories,
          };
        case 'createNewCategory':
          return {
            ...currentState,
            categories: (currentState?.categories ?? []).concat({
              name: action.categoryName,
              id: randomId(),
              items: [],
            }),
          };
        case 'removeCategory':
          return {
            ...currentState,
            categories: currentState?.categories?.filter(
              (category) => action.categoryId !== category.id
            ),
          };
        case 'addItemInCategory':
          return produce(currentState, (draftState) => {
            const categoryToUpdate = draftState?.categories?.find(
              ({ id }) => id === action.categoryId
            );

            if (!categoryToUpdate) {
              throw new Error(`Could not find item ${action.categoryId}.`);
            }

            categoryToUpdate.items.push({
              id: randomId(),
              name: action.itemName,
              checked: false,
            });
          });
        case 'removeItemInCategory':
          return {
            ...currentState,
            categories: currentState?.categories?.map((category) => {
              if (category.id !== action.categoryId) return category;
              return {
                ...category,
                items: category.items.filter((item) => {
                  return action.itemId !== item.id;
                }),
              };
            }),
          };
        case 'setItemInCategoryChecked':
          return produce(currentState, (draftState) => {
            const itemToUpdate = draftState?.categories
              ?.find(({ id }) => id === action.categoryId)
              ?.items.find(({ id }) => id === action.itemId);

            if (!(itemToUpdate && 'checked' in itemToUpdate)) {
              throw new Error(`Could not find item ${action.itemId}.`);
            }

            itemToUpdate.checked = action.checked;
          });
        case 'setItemInCategoryName':
          return produce(currentState, (draftState) => {
            const itemToUpdate = draftState?.categories
              ?.find(({ id }) => id === action.categoryId)
              ?.items.find(({ id }) => id === action.itemId);

            if (!(itemToUpdate && 'checked' in itemToUpdate)) {
              throw new Error(`Could not find item ${action.itemId}.`);
            }

            itemToUpdate.name = action.name;
          });
        case 'setCategoryName':
          return produce(currentState, (draftState) => {
            const categoryToUpdate = draftState?.categories?.find(
              ({ id }) => id === action.categoryId
            );

            if (!categoryToUpdate) {
              throw new Error(`Could not find item ${action.categoryId}.`);
            }

            categoryToUpdate.name = action.name;
          });
        case 'setCategoryColor':
          return produce(currentState, (draftState) => {
            const categoryToUpdate = draftState?.categories?.find(
              ({ id }) => id === action.categoryId
            );

            if (!categoryToUpdate) {
              throw new Error(`Could not find item ${action.categoryId}.`);
            }

            categoryToUpdate.color = action.color;
          });
        case 'setCategoriesItems':
          return produce(currentState, (draftState) => {
            action.categoriesItems.forEach(({ categoryId, items }) => {
              const categoryToUpdate = draftState?.categories?.find(
                ({ id }) => id === categoryId
              );

              if (!categoryToUpdate) {
                throw new Error(`Could not find item ${categoryId}.`);
              }

              categoryToUpdate.items = items;
            });
          });
        default:
          console.error(`Unhandled action:`, { action });
          throw new Error(`Unhandled action`);
      }
    },
    initialListData
  );

  return {
    listData,
    dispatchListAction,
  };
};

export const useListWithServerData = ({ listId }: { listId: string }) => {
  const { listData, dispatchListAction } = useListData(null);
  const [listDataFromServer, setListDataFromServer] = useState<ListData | null>(
    null
  );

  const listRef = useMemo(
    () => firebase.firestore().collection('lists').doc(listId),
    [listId]
  );

  useEffect(() => {
    const unsubscribe = listRef.onSnapshot({
      next: (newDocData) => {
        const serverListData = newDocData.data() ?? {};
        setListDataFromServer(serverListData);
        dispatchListAction({
          type: 'setListData',
          listData: serverListData,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
    return () => unsubscribe();
  }, [listRef, dispatchListAction]);

  useEffect(() => {
    if (!listData) {
      return;
    }

    if (listData === listDataFromServer) {
      return;
    }
    listRef.set(listData, { merge: true });
  }, [listData, listDataFromServer, listRef]);

  return {
    listData,
    dispatchListAction,
  };
};
