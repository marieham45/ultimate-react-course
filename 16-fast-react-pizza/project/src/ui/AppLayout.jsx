import React from 'react';
import CartOverview from "../features/cart/CartOverview.jsx";
import Header from "./Header.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

const AppLayout = () => {
    const navigation = useNavigation()
    const isLoading = navigation.state === "loading"

    return (
        <div className="layout">
            {isLoading && <Loader/>}
          <Header/>
          <main>
              <Outlet/>
          </main>
            <CartOverview/>
        </div>
    );
};

export default AppLayout;