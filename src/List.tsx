import produce from 'immer';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { Checkbox, Input, HStack } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

import { Card } from './Card';

import { useListData } from './useListData';

const List = ({ id }: { id: string }) => {
  const {
    listData,
    createNewItemInCategory,
    setItemInCategoryChecked,
    setItemInCategoryName,
    setCategoriesItems,
  } = useListData({ id });

  const getCategoryItemsByCategoryId = (categoryId: string) =>
    listData?.categories.find((category) => category.id === categoryId)
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

      setCategoriesItems([
        {
          categoryId: source.droppableId,
          items,
        },
      ]);
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

      setCategoriesItems([
        {
          categoryId: source.droppableId,
          items: sourceItems,
        },
        {
          categoryId: destination.droppableId,
          items: destinationItems,
        },
      ]);
    }
  };

  return (
    <div>
      <h2>{listData?.name}</h2>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
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
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ol>
                  )}
                </Droppable>
              </Card>
            ))}
          </ol>
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
