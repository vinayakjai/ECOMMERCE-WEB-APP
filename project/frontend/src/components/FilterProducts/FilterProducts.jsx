// CSS imports
import "./FilterProducts.css";

import useCategory from "../../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFilteredProductsCall } from "../../helpers/fetchProductsHelper";
import Error from "../../pages/Error/Error";

function FilterProducts({ setProductList }) {
  const minPriceOptions = [0, 10, 20, 50, 100, 200];
  const maxPriceOptions = [0, 10, 20, 50, 100, 200, 1000];

  let [filterQuery, setFilterQuery] = useState({
    searchQuery: "",
    min: 0,
    max: 0,
  });

  const { categories, err } = useCategory();
  const navigate = useNavigate();

  function handleChange(e) {
    setFilterQuery({ ...filterQuery, searchQuery: e.target.value });
  }
  function detectMin(e) {
    setFilterQuery({ ...filterQuery, min: e.target.value });
  }
  function detectMax(e) {
    setFilterQuery({ ...filterQuery, max: e.target.value });
  }

  function searchFilteredProduct() {
    const { min, max, searchQuery } = filterQuery;

    if (!min && !max && searchQuery == "") {
      return;
    }
    const filteredProducts = fetchFilteredProductsCall(min, max, searchQuery);
    filteredProducts
      .then((response) => {
        setProductList(response.data.products);
      })
      .catch(() => {
        return alert("error while filtering data plz try again");
      });
  }

  function handleCategoryNavigate(category) {
    navigate(`/products?category=${category}`);
  }

  return (
    <div className="product-list-sidebar d-flex flex-column">
      <div className="sidebar-title">Search Products</div>
      <div className="sidebar-search form-group">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          id="searchInput"
          value={filterQuery.searchQuery}
          onChange={handleChange}
        />
      </div>

      <div className="sidebar-title fw-bold">Categories</div>
      <div id="categoryList">
        {err ? (
          <Error />
        ) : (
          categories &&
          categories.map((category) => (
            <a
              onClick={() => handleCategoryNavigate(category)}
              key={category}
              className="d-flex text-decoration-none"
            >
              {category}
            </a>
          ))
        )}
      </div>

      <div className="sidebar-title">Filter by price</div>
      <div className="price-filter">
        <div className="price-filter-select d-flex flex-row justify-content-between">
          <div className="form-group">
            <select
              name="minPrice"
              className="form-select"
              id="minPrice"
              onChange={detectMin}
            >
              {minPriceOptions.map((optionValue) => {
                return (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              name="maxPrice"
              className="form-select"
              id="maxPrice"
              onClick={detectMax}
            >
              {maxPriceOptions.map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="price-filter-title d-flex flex-row justify-content-between">
          <div id="price-filter-label-min">Min Price</div>
          <div id="price-filter-label-max">Max Price</div>
        </div>
      </div>
      <button
        className="btn btn-warning clear-filter"
        id="search"
        onClick={searchFilteredProduct}
      >
        Search
      </button>
      <button className="btn btn-danger clear-filter" id="clear">
        Clear Filters
      </button>
    </div>
  );
}

export default FilterProducts;
