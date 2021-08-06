import { useListData } from './useListData';

const List = ({ id }: { id: string }) => {
  const { listData, createNewItemInCategory, setItemInCategoryChecked } =
    useListData({ id });

  return (
    <div>
      <h2>{listData?.name}</h2>
      <div>
        <ol style={{ listStyleType: 'none', padding: 0 }}>
          {listData?.categories.map((category) => (
            <li key={category.id} className='card'>
              <h3>{`${category.name}:`}</h3>

              <button
                onClick={() =>
                  createNewItemInCategory({ categoryId: category.id })
                }
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
                          setItemInCategoryChecked({
                            categoryId: category.id,
                            itemId: item.id,
                            checked: e.target.checked,
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
