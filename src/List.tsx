import { useState } from 'react';
import { createPortal } from 'react-dom';
import produce from 'immer';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

import { Checkbox, Input, HStack, Button } from '@chakra-ui/react';
import { DragHandleIcon, DeleteIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { IoColorPalette } from 'react-icons/io5';
import Masonry from 'react-masonry-css';
// eslint-disable-next-line
import styled from 'styled-components/macro';
import type {} from 'styled-components/cssprop';

import { Card } from './Card';

import { useListData } from './useListData';

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
            columnClassName='my-masonry-grid_column'
            style={{ marginLeft: '20px', marginRight: '20px' }}
          >
            {listData?.categories?.map((category) => (
              <div key={category.id} style={{ padding: '1em' }}>
                <Card
                  style={{ width: '100%', backgroundColor: category.color }}
                >
                  <HStack>
                    <Input
                      type='text'
                      defaultValue={category.name}
                      variant='unstyled'
                      style={{ fontWeight: 'bold', fontSize: '1em' }}
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
                          itemName: '',
                        })
                      }
                    >
                      +
                    </button>
                  </div>

                  <Droppable droppableId={category.id}>
                    {(droppableProvided, droppableSnapshot) => {
                      return (
                        <ol
                          ref={droppableProvided.innerRef}
                          style={{ listStyleType: 'none', padding: 0 }}
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
                                          margin-left: 0.5rem;
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
                                        style={{ opacity: '0.7' }}
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
                                        onClick={() => {dispatchListAction({
                                          type: 'removeItemInCategory',
                                          categoryId: category.id,
                                          itemId: item.id,
                                        })}}
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
                        </ol>
                      );
                    }}
                  </Droppable>
                  <button
                    className='show-on-card-hover'
                    aria-label='Change Color'
                    onClick={() => {}}
                  >
                    <IoColorPalette />
                  </button>
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
