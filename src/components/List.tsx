// eslint-disable-next-line
import styled from 'styled-components/macro';
import type {} from 'styled-components/cssprop';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Masonry from 'react-masonry-css';
import produce from 'immer';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Checkbox,
  Input,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Portal,
} from '@chakra-ui/react';
import {
  DragHandleIcon,
  DeleteIcon,
  SmallCloseIcon,
  SmallAddIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons';
import { BiPalette } from 'react-icons/bi';

import { useListData } from '../hooks/useListData';

const colorOptions = [
  '#f0d6f7',
  '#fdcc69',
  '#ffeead',
  '#d6eff7',
  '#b0ebb2',
  '#fbdada',
  '#d1c7f3',
];

export const Card = styled.div`
  padding: 1rem;
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #e7e7e7ef;
  backdrop-filter: blur(1px);

  @media (hover: hover) {
    .show-on-card-hover {
      opacity: 0;
    }

    &:hover .show-on-card-hover {
      opacity: 1;
    }
  }
`;

const List = ({
  listData,
  dispatchListAction,
}: ReturnType<typeof useListData>) => {
  const [portalDiv, setPortalDiv] = useState<HTMLDivElement | null>(null);

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
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            style={{ marginLeft: '20px', marginRight: '20px' }}
          >
            {listData?.categories?.map((category, index) => (
              <div key={category.id} style={{ padding: '1em' }}>
                <Card
                  style={{
                    width: '100%',
                    backgroundColor: category.color
                      ? category.color
                      : colorOptions[index % colorOptions.length],
                  }}
                >
                  <HStack>
                    <Input
                      type='text'
                      defaultValue={category.name}
                      variant='unstyled'
                      css={`
                        font-size: 1em;
                        font-weight: 500;
                        margin-left: 0.5rem;
                        text-transform: capitalize;
                      `}
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

                  <Droppable droppableId={category.id}>
                    {(droppableProvided, droppableSnapshot) => {
                      return (
                        <div
                          ref={droppableProvided.innerRef}
                          style={{
                            listStyleType: 'none',
                            padding: 0,
                            color: droppableSnapshot.isDraggingOver
                              ? 'grey'
                              : 'black',
                          }}
                          {...droppableProvided.droppableProps}
                        >
                          {category.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(draggableProvided, draggableSnapshot) => {
                                  if (
                                    portalDiv &&
                                    draggableSnapshot.isDragging
                                  ) {
                                    return createPortal(
                                      <div
                                        css={`
                                          display: flex;
                                          align-items: center;
                                          user-select: none;
                                          background: #ffffff33;
                                          & > *:not(:first-child) {
                                            margin-left: 0.5rem;
                                          }
                                        `}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        style={
                                          draggableProvided.draggableProps.style
                                        }
                                      >
                                        <DragHandleIcon />
                                        <Checkbox
                                          css={`
                                            border-color: #8e8e8ec0;
                                          `}
                                          colorScheme='blue'
                                          isChecked={item.checked}
                                        />
                                        <span>{item.name}</span>
                                      </div>,
                                      portalDiv
                                    );
                                  }
                                  return (
                                    <li
                                      ref={draggableProvided.innerRef}
                                      {...draggableProvided.draggableProps}
                                      {...draggableProvided.dragHandleProps}
                                      css={`
                                        display: flex;
                                        align-items: center;
                                        & > *:not(:first-child) {
                                          margin-left: 0.8rem;
                                        }

                                        .show-on-item-hover {
                                          opacity: 0;
                                        }
                                        &:hover .show-on-item-hover {
                                          opacity: 1;
                                        }
                                      `}
                                    >
                                      <DragHandleIcon
                                        className='show-on-item-hover'
                                        css={`
                                          margin-left: -8px;
                                          margin-right: -6px;
                                        `}
                                      />
                                      <Checkbox
                                        css={`
                                          border-color: #8e8e8ec0;
                                        `}
                                        colorScheme='blue'
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
                                      <button
                                        className='show-on-item-hover'
                                        onClick={() => {
                                          dispatchListAction({
                                            type: 'removeItemInCategory',
                                            categoryId: category.id,
                                            itemId: item.id,
                                          });
                                        }}
                                      >
                                        <SmallCloseIcon
                                          style={{
                                            fontSize: '20px',
                                            opacity: '0.7',
                                          }}
                                        />
                                      </button>
                                    </li>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {droppableProvided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>

                  <div
                    css={`
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      margin-left: 15px;
                    `}
                  >
                    <SmallAddIcon
                      color='grey'
                      w={5}
                      h={5}
                      css={`
                        margin-right: 10px;
                        margin-left: -2px;
                      `}
                    />
                    <Input
                      type='text'
                      variant='unstyled'
                      placeholder='new item'
                      onBlur={(e) => {
                        dispatchListAction({
                          type: 'addItemInCategory',
                          categoryId: category.id,
                          itemName: e.target.value,
                        });
                        e.currentTarget.value = '';
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          dispatchListAction({
                            type: 'addItemInCategory',
                            categoryId: category.id,
                            itemName: (e.target as HTMLInputElement).value,
                          });
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Popover isLazy={true}>
                      <PopoverTrigger>
                        <button className='show-on-card-hover'>
                          <BiPalette size={18} />
                        </button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent
                          width='fit-content'
                          max-width='fit-content'
                        >
                          <PopoverArrow />
                          <PopoverBody paddingBottom={0}>
                            {colorOptions.map((color) => {
                              return (
                                <button
                                  key={color}
                                  className='color-sample'
                                  style={{ backgroundColor: color }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (category.color !== color) {
                                      dispatchListAction({
                                        type: 'setCategoryColor',
                                        categoryId: category.id,
                                        color: color,
                                      });
                                    }
                                    e.currentTarget.blur();
                                  }}
                                />
                              );
                            })}
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </div>
                </Card>
              </div>
            ))}
            <div style={{ padding: '1em' }}>
              <Card
                as='button'
                onClick={() =>
                  dispatchListAction({
                    type: 'createNewCategory',
                    categoryName: 'category',
                  })
                }
                css={`
                  width: 100%;
                  min-height: 100px;
                  padding: 0;
                  font-size: 1em;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <PlusSquareIcon
                  css={`
                    margin-right: 5px;
                  `}
                />
                new category
              </Card>
            </div>
          </Masonry>
        </DragDropContext>
      </div>
      <div
        ref={(element) => {
          setPortalDiv(element);
        }}
        css={`
          position: absolute;
          pointer-events: none;
          height: 100%;
          width: 100%;
          top: 0;
          bottom: 0;
        `}
      />
    </div>
  );
};

export default List;
