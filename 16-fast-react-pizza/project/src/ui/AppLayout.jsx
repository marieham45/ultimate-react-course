import React from 'react';
import CartOverview from "../features/cart/CartOverview.jsx";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
          <Header/>
          <main>
              <Outlet/>
          </main>
            <CartOverview/>
        </div>
    );
};

export default AppLayout;