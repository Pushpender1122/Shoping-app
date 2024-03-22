import Lpage from "./component/Login/lpage";
import Addprodcut from "./component/admin/addprodcut";
import Dataprovider from "./component/context/data";
import Homepage from "./component/home/hpage";
import Productde from "./component/product/productde";
import Spage from "./component/signup/spage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from "./component/userpage/user";
import CartComponent from "./component/cart/cartpage";
import PrivateRoutes from "./component/private/privateRoute";
import Protectedlogin from "./component/private/protectedlogin";
import { useContext } from "react";
import { Authentication } from './component/context/auth';
import AdminprivateRoute from "./component/private/adminprivateRoute";
import Wishlist from "./component/cart/wishlist";
import Page404 from "./component/404/page404";
import ProductSearch from "./component/product/seachproduct";
function App() {
  const { isAuthenticated } = useContext(Authentication);
  // console.log(isAuthenticated);
  return (
    <Dataprovider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route element={<AdminprivateRoute />}>
              <Route exact path="/admin/addproduct" element={<Addprodcut />} />
            </Route>
            <Route element={<Protectedlogin />}>
              <Route exact path="/user/signup" element={<Spage />} />
              <Route exact path="/user/login" element={<Lpage />} />
            </Route>
            <Route element={<PrivateRoutes />} >
              <Route path="/user/profile" element={<UserProfile />} />
              <Route exact path="/user/wishlist" element={<Wishlist />} />
            </Route >
            <Route exact path="/product/cart" element={<CartComponent />} />
            <Route exact path="/product/:id" element={<Productde />} />
            <Route exact path="/product/search" element={<ProductSearch />} />
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Dataprovider>
  );
}

export default App;
