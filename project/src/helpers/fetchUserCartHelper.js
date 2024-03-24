import axios from "axios";
import {
  addProductToCart,
  calculatepriceApi,
  createCartForUser,
  deleteUserCart,
  getCartByUser,
  updateProductQuantity,
} from "../apis/fakeStoreProdApis";

export async function createCart(userId) {
  try {
    await axios.post(createCartForUser(userId), { withCredentials: true });
  } catch (error) {
    return error.response.data;
  }
}
export async function fetchUserCart(userId) {
  try {
    const userCartPromise = await axios.get(getCartByUser(userId), {
      withCredentials: true,
    });

    return userCartPromise;

    //return response.products
  } catch (error) {
    return error.response.data;
  }
}

export async function clearUserCart(userId) {
  try {
    await axios.delete(deleteUserCart(userId), { withCredentials: true });
  } catch (error) {
    return error.response.data;
  }
}

export async function addProductToUserCart(productId, userId, quantity = 0) {
  try {
    let response = await axios.put(
      addProductToCart(),
      {
        productId: Number(productId),
        userId,
        quantity,
      },
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function removeProductFromUserCart(userId, productId) {
  try {
    let response = await axios.delete(
      `http://localhost:8765/carts/product?userId=${userId}&productId=${productId}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateQuantityInUserCart(
  userId,
  productId,
  updatedQuantity
) {
  try {
    const response = await axios.put(
      updateProductQuantity(userId, productId, updatedQuantity),
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function calculatePrice(productsInCart) {
  try {
    
    const response = await axios.get(
      calculatepriceApi(productsInCart),
      
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    return error.response.data;
  }
}
