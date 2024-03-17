import { useContext, useEffect, useState } from "react";
import OrderDetailsProduct from "../../components/OrderDetailsProduct/OrderDetailsProduct";
import "./Cart.css";
import CartContext from "../../context/CartContext";
import axios from "axios";
//import { getProduct, updateProductInCart } from '../../apis/fakeStoreProdApis';
import userContext from "../../context/userContext";
import { fetchProductDetailCall } from "../../helpers/fetchProductsHelper";
import {
  removeProductFromUserCart,
  updateQuantityInUserCart,
} from "../../helpers/fetchUserCartHelper";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(userContext);
  let [quantity, setQuantity] = useState(null);
  const [products, setProducts] = useState([]);
  async function downloadCartProducts(cart) {
    if (!cart) {
     
      return ;
    }

    let productIds = cart.map((product) => {
      return { productId: product.productId, quantity: product.quantity };
    });

    let allProductPromise = productIds.map(async (product) => {
      let response = fetchProductDetailCall(product.productId);
      let products = response.then((productDetail) => {
        return {
          productDetails: productDetail.data.product,
          quantity: product.quantity,
        };
      }).catch(()=>{
        return alert('unable to fetch products in cart')
      });
      return products;
    });

    const allProducts = await axios.all(allProductPromise);

    setProducts(allProducts);
  }

  async function updateQuantity(productId, updatedQuantity) {
    if (!user) return;
    if (!cart) return;

    const result = updateQuantityInUserCart(
      user.id,
      productId,
      updatedQuantity
    );
    result
      .then((response) => {
        setCart([...response.data.products]);
      })
      .catch(() => {
        return alert("unable to update quantity");
      });
  }

  async function deleteProductFromCart(productId) {
    if (!user) return;
    if (!cart) return;

    const result = removeProductFromUserCart(user.id, productId);
    result
      .then((response) => {
        setCart([...response.data.products]);
      })
      .catch(() => {
        return alert("unable to update quantity");
      });
  }

  useEffect(() => {
    if (!user) {
      return alert("please login");
    }
    downloadCartProducts(cart);
  }, [cart, quantity]);

  return (
    <div className="container">
      <div className="row">
        <h2 className="cart-title text-center">Your cart</h2>
        <div className="cart-wrapper d-flex flex-row">
          <div className="order-details d-flex flex-column" id="orderDetails">
            <div className="order-details-title fw-bold">Order Details</div>

            {products.length > 0 &&
              products.map((product) => (
                <OrderDetailsProduct
                  id={product.productDetails.id}
                  key={product.productDetails.id}
                  title={product.productDetails.title}
                  image={product.productDetails.image}
                  price={product.productDetails.price}
                  oldQuantity={product.quantity}
                  updateQuantity={updateQuantity}
                  deleteProductFromCart={deleteProductFromCart}
                />
              ))}
          </div>

          <div className="price-details d-flex flex-column" id="priceDetails">
            <div className="price-details-box">
              <div className="price-details-title fw-bold">Price Details</div>
              <div className="price-details-data">
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Price</div>
                  <div id="total-price"></div>
                </div>
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Discount</div>
                  <div>10</div>
                </div>
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Delivery Charges</div>
                  <div>FREE</div>
                </div>
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div id="net-price"></div>
                </div>
              </div>
            </div>
            <div className="price-details-btn-group">
              <a
                href="productList.html"
                className="continue-shopping-btn btn btn-info text-decoration-none"
              >
                Continue Shopping
              </a>
              <a
                href="checkout.html"
                className="checkout-btn btn btn-primary text-decoration-none"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
