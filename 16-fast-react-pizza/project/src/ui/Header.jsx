import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to='/'>Fast React Pizza Cp.</Link>
            <p>Header</p>
        </header>
    );
};

export default Header;