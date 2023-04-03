import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../components/home/Home'
import Login from '../components/login/loginEmail/Login'
import PrivateRoute from "./PrivateRoute";
// import PublicRouter from "./PublicRoute";
import { useSelector } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/FirebaseConfig";
import Register from "../components/register/Register";
import LoginWithPhone from "../components/login/loginPhone/LoginWithPhone";
import InsertCode from "../components/login/loginPhone/InsertCode";
import Search from "../components/search/Search";
import Orders from "../components/orders/Orders";
import Order from "../components/orders/order/Order";
import Address from "../components/address/Address";
import Profile from "../components/profile/Profile";
import EditProfile from "../components/profile/editProfile/editProfile";
import PaymentMethod from "../components/payment/PaymentMethod";
import NewCard from "../components/payment/newCard/NewCard";
import Restaurant from "../components/restaurant/Restaurant";
import Plate from "../components/restaurant/plate/Plate";
import NewOrder from "../components/orders/newOrder/newOrder";
import CurrentOrder from "../components/orders/currentOrder/CurrentOrder";
import OrderAccepted from "../components/orders/orderAcepted/OrderAccepted";

const Router = () => {
    const { isLogged } = useSelector((store) => store.login);
    /* const [isLogin, setIsLogin] = useState(undefined);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user?.uid) {
            setIsLogin(true);
          } else {
            setIsLogin(false);
          }
        });
    }, [setIsLogin]);
    */ 

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute isLogged={isLogged} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="restaurant/:restaurantId" element={<Restaurant />} />
                    <Route path="plate/:restaurantId/:plateId" element={<Plate />} />
                    <Route path="address" element={<Address />} />
                    <Route path="search" element={<Search />} />
                    <Route path="newOrder" element={<NewOrder />} />
                    <Route path="currentOrder" element={<CurrentOrder />} />
                    <Route path="orderAccepted" element={<OrderAccepted />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:orderId" element={<Order />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="editProfile" element={<EditProfile />} />
                    <Route path="paymentMethod" element={<PaymentMethod />} />
                    <Route path="addNewCard" element={<NewCard />} />
                </Route>
                
                <Route path="loginPhone" element={<LoginWithPhone />} />
                <Route path="insertcode" element={<InsertCode />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/*<Route element={<PrivateRoute />}>
                     <Route path="/" element={<Home />} />
                    <Route path="restaurant/:restaurantId" element={<Restaurant />} />
                    <Route path="plate/:plateId" element={<Plate />} />
                    <Route path="address" element={<Address />} />
                    <Route path="search" element={<Search />} />
                    <Route path="newOrder" element={<NewOrder />} />
                    <Route path="currentOrder" element={<CurrentOrder />} />
                    <Route path="orderAccepted" element={<OrderAccepted />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:orderId" element={<Order />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="editProfile" element={<EditProfile />} />
                    <Route path="paymentMethod" element={<PaymentMethod />} />
    <Route path="addNewCard" element={<NewCard />} /> 

                </Route>
                <Route element={<PublicRouter />}>
                    <Route path="loginPhone" element={<LoginWithPhone />} />
                    <Route path="insertcode" element={<InsertCode />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>*/}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;