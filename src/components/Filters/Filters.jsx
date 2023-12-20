import React from 'react';
import classes from './style.module.css';

const FILTERS = {
  search: {
    name: 'search',
    type: 'search',
    fn: (product, value) =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description.toLowerCase().includes(value.toLowerCase()),
    value: '',
  },
  color: {
    name: 'colors',
    type: 'multiselect',
    fn: (product, colors) => colors.includes(product.color),
    value: [],
  },
  category: {
    name: 'categories',
    type: 'multiselect',
    fn: (product, categories) => categories.includes(product.category),
    value: [],
  },
};

const Filter = React.memo(function Filter({ item, onSetActiveItems }) {
  const [filterState, setFilterState] = React.useState(false);

  const handleSetFilterState = React.useCallback((state) => {
    setFilterState(state);
  }, []);

  React.useEffect(() => {
    onSetActiveItems(filterState, item);
  }, [onSetActiveItems, filterState, item]);

  return (
    <div className={classes.Filter}>
      <input
        type='checkbox'
        name={item}
        onChange={(e) => {
          handleSetFilterState(e.target.checked);
        }}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
});

function Filters({ products, onFiltersChange, field, title }) {
  const [itemsList, setItemsList] = React.useState([]);
  const [activeItemList, setActiveItemList] = React.useState([]);

  //collect unique items
  React.useEffect(() => {
    const unique_items = new Set();
    products.forEach((product) => unique_items.add(product[field]));
    setItemsList([...Array.from(unique_items)]);
  }, [products, field]);

  //set default filters state
  React.useEffect(() => {
    Object.entries(FILTERS).map(([key, value]) => onFiltersChange(key, value));
  }, [onFiltersChange]);

  //set value in filters
  React.useEffect(() => {
    onFiltersChange(field, {
      ...FILTERS[field],
      value: activeItemList.length ? activeItemList : itemsList,
    });
  }, [activeItemList, itemsList, field, onFiltersChange]);

  const handleSetActiveItems = React.useCallback((state, item) => {
    setActiveItemList((activeItemList) =>
      state
        ? [...activeItemList, item]
        : [...activeItemList.filter((el) => el !== item)]
    );
  }, []);

  return (
    <div className={classes.Filters}>
      <h1>{title}</h1>
      {itemsList.map((item) => (
        <Filter
          item={item}
          onSetActiveItems={handleSetActiveItems}
          key={item}
        />
      ))}
    </div>
  );
}

export default React.memo(Filters);
