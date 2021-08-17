import produce from 'immer';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { Checkbox, Input, HStack, Button } from '@chakra-ui/react';
import { DragHandleIcon, DeleteIcon } from '@chakra-ui/icons';
import Masonry from 'react-masonry-css';

import { Card } from './Card';

import { useListWithServerData } from './useListData';

const List = ({ id }: { id: string }) => {
  const { listData, dispatchListAction } = useListWithServerData({
    listId: id,
  });

  const getCategoryItemsByCategoryId = (categoryId: string) =>
    listData?.categories?.find((category) => category.id === categoryId)
      ?.items ?? [];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = produce(
        getCategoryItemsByCategoryId(source.droppableId),
        (draftReorderedList) => {
          const [removedItem] = draftReorderedList.splice(source.index, 1);
          draftReorderedList.splice(destination.index, 0, removedItem);
        }
      );

      dispatchListAction({
        type: 'setCategoriesItems',
        categoriesItems: [
          {
            categoryId: source.droppableId,
            items,
          },
        ],
      });
    } else {
      const [sourceItems, destinationItems] = produce(
        [
          getCategoryItemsByCategoryId(source.droppableId),
          getCategoryItemsByCategoryId(destination.droppableId),
        ],
        ([draftSourceItems, draftDestinationItems]) => {
          const [removedItem] = draftSourceItems.splice(source.index, 1);
          draftDestinationItems.splice(destination.index, 0, removedItem);
        }
      );

      dispatchListAction({
        type: 'setCategoriesItems',
        categoriesItems: [
          {
            categoryId: source.droppableId,
            items: sourceItems,
          },
          {
            categoryId: destination.droppableId,
            items: destinationItems,
          },
        ],
      });
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <h2>
        <Input
          type='text'
          variant='unstyled'
          defaultValue={listData?.name}
          onBlur={(e) => {
            if (listData?.name !== e.target.value) {
              dispatchListAction({
                type: 'setListName',
                newName: e.target.value,
              });
            }
          }}
        />
      </h2>

      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
          >
            {listData?.categories?.map((category) => (
              <div key={category.id} style={{ padding: '1em' }}>
                <Card style={{ width: '100%' }}>
                  <HStack>
                    <Input
                      type='text'
                      defaultValue={category.name}
                      variant='unstyled'
                      onBlur={(e) => {
                        if (category.name !== e.target.value) {
                          dispatchListAction({
                            type: 'setCategoryName',
                            categoryId: category.id,
                            name: e.target.value,
                          });
                        }
                      }}
                    />
                    <Button
                      size='sm'
                      variant='unstyled'
                      className='show-on-card-hover'
                    >
                      <DeleteIcon
                        onClick={() => {
                          dispatchListAction({
                            type: 'removeCategory',
                            categoryId: category.id,
                          });
                        }}
                      />
                    </Button>
                  </HStack>

                  <div>
                    <button
                      onClick={() =>
                        dispatchListAction({
                          type: 'addItemInCategory',
                          categoryId: category.id,
                          itemName: '.....',
                        })
                      }
                    >
                      +
                    </button>
                  </div>

                  <Droppable droppableId={category.id}>
                    {(provided, snapshot) => (
                      <ol
                        ref={provided.innerRef}
                        style={{ listStyleType: 'none', padding: 0 }}
                      >
                        {category.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <HStack
                                  as='li'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  // @ts-ignore
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <DragHandleIcon />
                                  <Checkbox
                                    isChecked={item.checked}
                                    onChange={(e) => {
                                      dispatchListAction({
                                        type: 'setItemInCategoryChecked',
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
                                        dispatchListAction({
                                          type: 'setItemInCategoryName',
                                          categoryId: category.id,
                                          itemId: item.id,
                                          name: e.target.value,
                                        });
                                      }
                                    }}
                                  />
                                </HStack>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ol>
                    )}
                  </Droppable>
                </Card>
              </div>
            ))}
            <div style={{ padding: '1em' }}>
              <Card
                as='button'
                onClick={() =>
                  dispatchListAction({
                    type: 'createNewCategory',
                    categoryName: 'new category',
                  })
                }
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '0',
                  fontSize: '3em',
                }}
              >
                +
              </Card>
            </div>
          </Masonry>
        </DragDropContext>
      </div>
    </div>
  );
};

// references https://codesandbox.io/s/ql08j35j3q?file=/index.js
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? '#ffffff33' : 'transparent',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default List;
