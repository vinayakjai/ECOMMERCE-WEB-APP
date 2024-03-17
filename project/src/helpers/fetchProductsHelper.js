import axios from "axios";
import {
  filterProduct,
  getAllCategories,
  getAllProducts,
  getAllProductsByCategory,
  getProduct,
} from "../apis/fakeStoreProdApis";

export async function fetchFilteredProductsCall(min, max, searchQuery) {
  try {
    console.log(min,max,searchQuery)
    const filterProductPromise = await axios.get(
      filterProduct(min, max, searchQuery),
      { withCredentials: true }
    );
    
    return filterProductPromise;
  } catch (err) {
    return err.response.data
  }
}

export async function fetchAllProductsCall() {
  try {
    const getAllProductsPromise = await axios.get(getAllProducts(), {
      withCredentials: true,
    });
    return getAllProductsPromise;
  } catch (err) {
    console.log('gere')
    return err.repsonse.data
  }
}

export async function fetchProductDetailCall(productId) {
  try {
    const productDetailPromise = await axios.get(getProduct(productId), {
      withCredentials: true,
    });
    return productDetailPromise;
  } catch (err) {
    return err.response.data
  }
}

export async function fetchAllProductsByCategory(productCategory) {
  try {
    const allProductsByCategoryPromise = await axios.get(
      getAllProductsByCategory(productCategory),
      { withCredentials: true }
    );
    return allProductsByCategoryPromise;
  } catch (err) {
     return err.response.data
  }
}


export async function fetchAllCategories() {
  try {
    const allProductCategoryPromise = await axios.get(
      getAllCategories(),
      { withCredentials: true }
    );
    return allProductCategoryPromise;
  } catch (err) {
    return err.response.data;
  }
}
