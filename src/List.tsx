import { Checkbox, Input, HStack } from '@chakra-ui/react';

import { Card } from './Card';

import { useListData } from './useListData';

const List = ({ id }: { id: string }) => {
  const {
    listData,
    createNewItemInCategory,
    setItemInCategoryChecked,
    setItemInCategoryName,
  } = useListData({ id });

  return (
    <div>
      <h2>{listData?.name}</h2>
      <div>
        <ol style={{ listStyleType: 'none', padding: 0 }}>
          {listData?.categories.map((category) => (
            <Card as='li' key={category.id}>
              <h3>{`${category.name}:`}</h3>

              <button
                onClick={() =>
                  createNewItemInCategory({ categoryId: category.id })
                }
              >
                +
              </button>
              <ol style={{ listStyleType: 'none', padding: 0 }}>
                {category.items.map((item) => {
                  return (
                    <HStack as='li' key={item.id}>
                      <Checkbox
                        isChecked={item.checked}
                        onChange={(e) => {
                          setItemInCategoryChecked({
                            categoryId: category.id,
                            itemId: item.id,
                            checked: e.target.checked,
                          });
                        }}
                      />

                      <Input
                        type='text'
                        defaultValue={item.name}
                        variant='unstyled'
                        onBlur={(e) => {
                          if (item.name !== e.target.value) {
                            setItemInCategoryName({
                              categoryId: category.id,
                              itemId: item.id,
                              name: e.target.value,
                            });
                          }
                        }}
                      />
                    </HStack>
                  );
                })}
              </ol>
            </Card>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default List;
