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
  calculatePrice,
} from "../../helpers/fetchUserCartHelper";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  let [quantity, setQuantity] = useState(null);
  const [totalPriceMetaData, setTotalPrice] = useState({
    totalPrice: null,
    finalPrice: null,
    deliveryCharge: 20,
    discount: 30,
  });
  const [products, setProducts] = useState([]);

  async function downloadCartProducts(cart) {
    if (!cart) {
      return;
    }

    let productIds = cart.map((product) => {
      return { productId: product.productId, quantity: product.quantity };
    });

    let allProductPromise = productIds.map(async (product) => {
      let response = fetchProductDetailCall(product.productId);
      let products = response
        .then((productDetail) => {
          return {
            productDetails: productDetail.data.product,
            quantity: product.quantity,
          };
        })
        .catch(() => {
          return alert("unable to fetch products in cart");
        });
      return products;
    });

    await axios.all(allProductPromise).then((data) => {
      calculatePriceOfProducts(data);

      setProducts(data);
    });
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

  function calculatePriceOfProducts(products) {
    if(!products || products.length==0){
      return
    }
  
    let totalPriceValue = 0;
    let discountValue = 30;
    let deliveryChargeValue = 20;
    products.map((product) => {
      totalPriceValue += product.quantity * product.productDetails.price;
     
    });

   

    if (totalPriceValue < 100) {
    
      setTotalPrice({
        ...totalPriceMetaData,
        finalPrice:' please order above 100rs',
        discount: 0,
        deliveryCharge: null,
        totalPrice: totalPriceValue,
      });
      return 
    }

    if(totalPriceValue<200 && totalPriceValue>=100){
     
      let finalPriceValue=totalPriceValue+deliveryChargeValue;
     
      setTotalPrice({
        ...totalPriceMetaData,
        finalPrice: finalPriceValue,
        discount: ' applicable on order above 200rs',
        deliveryCharge: deliveryChargeValue,
        totalPrice: totalPriceValue,
      });
      return 
    }
    if(totalPriceValue>=200){
      let finalPriceValue=totalPriceValue+deliveryChargeValue-discountValue;
     
      setTotalPrice({
        ...totalPriceMetaData,
        finalPrice: finalPriceValue,
        discount: discountValue,
        deliveryCharge: deliveryChargeValue,
        totalPrice: totalPriceValue,
      });
      return
    }
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
  
    downloadCartProducts(cart);
  }, [cart,totalPriceMetaData.totalPrice]);

  return (
    <div className="container">
      <div className="row">
        <h2 className="cart-title text-center">Your cart</h2>
        <div className="cart-wrapper d-flex flex-row">
          <div className="order-details d-flex flex-column" id="orderDetails">
            <div className="order-details-title fw-bold">Order Details</div>

            {products.length > 0
              ? products.map((product) => (
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
                ))
              : "no items in cart"}
          </div>

          <div className="price-details d-flex flex-column" id="priceDetails">
            <div className="price-details-box">
              <div className="price-details-title fw-bold">Price Details</div>
              <div className="price-details-data">
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Price:{totalPriceMetaData.totalPrice}</div>
                  <div id="total-price"></div>
                </div>
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Discount:{totalPriceMetaData.discount}</div>
                  <div></div>
                </div>
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Delivery Charges:{totalPriceMetaData.deliveryCharge}</div>
                  <div></div>
                </div>
                <div className="price-details-item d-flex flex-row justify-content-between">
                  <div>Final Price:{totalPriceMetaData.finalPrice}</div>
                  <div id="net-price"></div>
                </div>
              </div>
            </div>
            <div className="price-details-btn-group">
              <button
                onClick={() => navigate(`/products?category=`)}
                className="continue-shopping-btn btn btn-info text-decoration-none"
              >
                Continue Shopping
              </button>
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
