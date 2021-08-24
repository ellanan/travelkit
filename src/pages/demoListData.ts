import { ListData } from '../useListData';

export const demoListData: ListData = {
  name: 'My Wonderful List',
  categories: [
    {
      id: 'catagory-a',
      name: 'thing',
      items: [
        {
          id: 'item-1',
          checked: false,
          name: 'thingathing',
        },
      ],
      color: '#FFEEAD',
    },
    {
      id: 'catagory-b',
      name: 'ahhhhhhh',
      items: [
        {
          id: 'item-2',
          checked: false,
          name: 'bazinga',
        },
      ],
      color: '#96DAC8',
    },
    {
      id: 'catagory-c',
      name: 'thing',
      items: [
        {
          id: 'item-3',
          checked: false,
          name: 'thingathing',
        },
        {
          id: 'item-4',
          checked: false,
          name: 'thingathing',
        },
      ],
      color: '#D6EFF7',
    },
  ],
};
