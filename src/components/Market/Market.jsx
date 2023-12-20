import React from "react";
import generateProducts from "../../utils/generate-products";
import Products from "../Products/Products";
import Search from "../Search/Search";
import Sorts from "../Sorts/Sorts";
import Filters from "../Filters/Filters";
import classes from "./style.module.css";
import Preloader from "../Preloader/Preloader";

export default function Market() {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filters, setFilters] = React.useState({});
  const [sortFn, setSortFn] = React.useState(() => () => 0);

  React.useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(true);
      setProducts(generateProducts(20));
    }, 1500);
  }, []);

  const handleSetActiveSort = React.useCallback((fn) => {
    setSortFn(fn);
  }, []);

  const handleFilterChange = React.useCallback((key, new_filter) => {
    setFilters((filters) => ({ ...filters, [key]: new_filter }));
  }, []);

  if (!isLoading) {
    return <Preloader />;
  }

  const displayingProducts = products
    .filter((t) =>
      Object.entries(filters).every(([_, obj]) => obj.fn(t, obj.value))
    )
    .sort(sortFn);

  return (
    <div className={classes.Wrapper}>
      <div className={classes.SettingsContainer}>
        <Sorts onSortChange={handleSetActiveSort} />
        <Search
          placeholder={"Search..."}
          onFilterChange={handleFilterChange}
          filters={filters}
          defaultValue={""}
        />
      </div>
      <div className={classes.MainContent}>
        <div className={classes.FiltersContainer}>
          <Filters
            products={products}
            onFiltersChange={handleFilterChange}
            field={"color"}
            title={"Colors"}
          />
          <Filters
            products={products}
            onFiltersChange={handleFilterChange}
            field={"category"}
            title={"Categories"}
          />
        </div>
        <Products products={displayingProducts} />
      </div>
    </div>
  );
}
