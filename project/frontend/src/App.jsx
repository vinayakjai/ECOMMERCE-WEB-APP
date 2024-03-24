// CSS imports
import "./App.css";
// library imports
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
// Custom components
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainRoutes from "./routes/MainRoutes";
// context import
import UserContext from "./context/userContext.js";
import CartContext from "./context/CartContext.js";
import { createCart, fetchUserCart } from "./helpers/fetchUserCartHelper";
import { fetchToken } from "./helpers/fetchUserInfo";
import Error from "./pages/Error/Error";

function App() {
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const [token, setToken] = useCookies(["token"]);

  async function accessToken() {
    const userInfoPromise = fetchToken();
    userInfoPromise
      .then(async (response) => {
        setToken("token", response.data.token, { httpOnly: true });

        const tokenDetails = await jwt_decode(response.data.token);

        setUser({ ...user, username: tokenDetails.user, id: tokenDetails.id });
      })
     
  }

  async function load() {
    if (!user) {
      accessToken();
    }
    if (user) {
      createCart(user.id);
      let userCartPromise = fetchUserCart(user.id);
      userCartPromise.then((response) => {
      
        setCart([...response.data.products.products]);
      });
    }
  }

  useEffect(() => {
    load();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        
          <div className="app-wrapper">
            {/* Common header for all pages */}
            <Header color="light" light={true} expand="md" container="md" />

            <MainRoutes />

            {/* Common footer for all pages */}
            <Footer />
          </div>
        
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
