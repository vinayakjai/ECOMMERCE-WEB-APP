// CSS imports
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useContext, useEffect, useState } from "react";
import { getProduct } from "../../apis/fakeStoreProdApis";
import axios from "axios";
import userContext from "../../context/userContext";
import CartContext from "../../context/CartContext";
import {
  addProductToUserCart,
  fetchUserCart,
  removeProductFromUserCart,
} from "../../helpers/fetchUserCartHelper";
import { fetchProductDetailCall } from "../../helpers/fetchProductsHelper";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(userContext);
  const { cart, setCart } = useContext(CartContext);
  
  const [isLoading, setisLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const [cartButton, setCartButton] = useState(true);

  async function downloadProduct(id) {
    const response = fetchProductDetailCall(id);
    response.then((productDetail) => {
      setProduct(productDetail.data.product);
    });
  }

  function handleCartButton() {
    if(!user){
      return alert('please login')
    }
    setisLoading(true);
    if (cartButton) {
      const addToCartPromise = addProductToUserCart(id, user.id, 1);
      addToCartPromise.then((response) => {
       
        setisLoading(false);
        setCartButton(false);
        setCart([...response.data.products]);
      });
    } else {
      let userCartPromise = removeProductFromUserCart(id, user.id);
      userCartPromise.then((response) => {
        console.log([...response.data.products]);
        setisLoading(false);
        setCartButton(true);
        setCart([...response.data.products]);
      });
    }
  }

  useEffect(() => {
    downloadProduct(id);
  
    cart &&
      cart.map((product) => {
        if (product.productId == Number(id)) {
          setCartButton(false);
        }
      });
  }, [cartButton, cart]);

  return (
    product && (
      <div className="container">
        <div className="row">
          <div className="product-details-wrapper d-flex justify-content-between align-items-start flex-row">
            <div className="product-img d-flex">
              <img src={product.image} alt="product image" id="product-img" />
            </div>

            <div className="product-details-box d-flex flex-column">
              <div id="productDetails">
                {/* <!-- product details --> */}
                <div className="product-name" id="product-name">
                  {product.title}
                </div>
                <div className="product-price fw-bold" id="product-price">
                  {product.price}
                </div>
                <div className="product-description">
                  <div className="product-description-title fw-bold">
                    Description
                  </div>
                  <div
                    className="product-description-data"
                    id="product-description-data"
                  >
                    {product.description}
                  </div>
                </div>
              </div>

              <div
                className="product-details-action btn btn-primary text-decoration-non "
                onClick={handleCartButton}
              >
                {isLoading
                  ? "wait.."
                  : cartButton
                  ? "Add to Cart"
                  : "Remove product from cart"}
              </div>

              <Link to={`/cart`}>
                <p
                  id="goToCartBtn"
                  className="product-details-action btn btn-warning text-decoration-none"
                >
                  Go to cart
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetails;
