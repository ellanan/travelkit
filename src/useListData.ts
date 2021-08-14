import firebase from 'firebase/app';
import produce from 'immer';

import { useCallback, useEffect, useMemo, useState } from 'react';

const db = firebase.firestore();

export interface ListItem {
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

const ensureListDataShape = (input: Record<string, any>): ListData => {
  return {
    name: input.name ?? 'New List',
    categories: input.categories ?? [],
  }
}

export const useListData = ({ id }: { id: string }) => {
  const [listData, setListdata] = useState<ListData | null>(null);
  const listRef = useMemo(() => db.collection('lists').doc(id), [id]);

  const setListDataName = useCallback(
    (newName: string) => {
      if (!listData) return;

      listRef.update({
        name: newName,
      });
    },
    [listData, listRef]
  );

  const setCategories = useCallback(
    (newCategories: Category[]) => {
      listRef.update({
        categories: newCategories,
      });
    },
    [listRef]
  );

  const createNewCategory = useCallback(() => {
    if (!listData) return;

    listRef.update({
      categories: [
        ...listData.categories,
        {
          name: 'add new',
          id: Math.random().toString(36).substr(2, 9),
          items: [],
        },
      ],
    });
  }, [listData, listRef]);

  const removeCategory = useCallback(
    ({ categoryId }: { categoryId: string }) => {
      if (!listData) return;
      const updatedCategories = listData.categories.filter((category) => {
        return categoryId !== category.id;
      });
      listRef.update({
        categories: updatedCategories,
      });
    },
    [listData, listRef]
  );

  const createNewItemInCategory = useCallback(
    ({ categoryId }: { categoryId: string }) => {
      if (!listData) return;
      const newCategories = produce(listData.categories, (draftCategories) => {
        const categoryToUpdate = draftCategories.find(
          ({ id }) => id === categoryId
        );

        if (!categoryToUpdate) {
          throw new Error(
            `Could not find item ${categoryId}. This should be impossible`
          );
        }

        categoryToUpdate.items.push({
          id: Math.random().toString(36).substr(2, 9),
          name: '.......',
          checked: false,
        });
      });

      listRef.update({
        categories: newCategories,
      });
    },
    [listData, listRef]
  );

  const setItemInCategoryChecked = useCallback(
    ({
      categoryId,
      itemId,
      checked,
    }: {
      categoryId: string;
      itemId: string;
      checked: boolean;
    }) => {
      if (!listData) return;

      const newCategories = produce(listData.categories, (draftCategories) => {
        const itemToUpdate = draftCategories
          .find(({ id }) => id === categoryId)
          ?.items.find(({ id }) => id === itemId);

        if (!(itemToUpdate && 'checked' in itemToUpdate)) {
          throw new Error(
            `Could not find item ${itemId}. This should be impossible`
          );
        }

        itemToUpdate.checked = checked;
      });
      listRef.update({
        categories: newCategories,
      });
    },
    [listData, listRef]
  );

  const setItemInCategoryName = useCallback(
    ({
      categoryId,
      itemId,
      name,
    }: {
      categoryId: string;
      itemId: string;
      name: string;
    }) => {
      if (!listData) return;

      const newCategories = produce(listData.categories, (draftCategories) => {
        const itemToUpdate = draftCategories
          .find(({ id }) => id === categoryId)
          ?.items.find(({ id }) => id === itemId);

        if (!(itemToUpdate && 'checked' in itemToUpdate)) {
          throw new Error(
            `Could not find item ${itemId}. This should be impossible`
          );
        }

        itemToUpdate.name = name;
      });
      listRef.update({
        categories: newCategories,
      });
    },
    [listData, listRef]
  );

  const setCategoryName = useCallback(
    ({ categoryId, name }: { categoryId: string; name: string }) => {
      if (!listData) return;

      const newCategories = produce(listData.categories, (draftCategories) => {
        const categoryToUpdate = draftCategories.find(
          ({ id }) => id === categoryId
        );

        if (!categoryToUpdate) {
          throw new Error(
            `Could not find item ${categoryId}. This should be impossible`
          );
        }

        categoryToUpdate.name = name;
      });
      setCategories(newCategories);
    },
    [listData, setCategories]
  );

  const setCategoriesItems = useCallback(
    (categoriesItems: Array<{ categoryId: string; items: ListItem[] }>) => {
      if (!listData) return;

      const newCategories = produce(listData.categories, (draftCategories) => {
        categoriesItems.forEach(({ categoryId, items }) => {
          const categoryToUpdate = draftCategories.find(
            ({ id }) => id === categoryId
          );
          if (!categoryToUpdate) {
            throw new Error(
              `Could not find item ${categoryId}. This should be impossible`
            );
          }
          categoryToUpdate.items = items;
        });
      });
      setListdata(
        (state) =>
          state && {
            ...state,
            categories: newCategories,
          }
      );
      listRef.update({
        categories: newCategories,
      });
    },
    [listData, listRef, setListdata]
  );

  useEffect(() => {
    listRef.onSnapshot({
      next: (newDocData) => {
        // @ts-ignore
        setListdata(ensureListDataShape(newDocData.data()));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }, [listRef]);

  return {
    listData,
    setListdata,
    createNewCategory,
    createNewItemInCategory,
    setItemInCategoryChecked,
    setItemInCategoryName,
    setCategoriesItems,
    setCategoryName,
    setListDataName,
    removeCategory,
  };
};
