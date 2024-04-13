import React from 'react';
import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

const Header = () => {
    return (
        <header>
            <Link to='/'>Fast React Pizza Cp.</Link>
            <SearchOrder/>
            <p>Header</p>
        </header>
    );
};

export default Header;