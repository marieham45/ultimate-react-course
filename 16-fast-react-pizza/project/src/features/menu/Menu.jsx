import {getMenu} from "../../services/apiRestaurant.js";
import {useLoaderData} from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu() {
    // render as you fetch
    const menu = useLoaderData()
    return <ul>{menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id}/>)}</ul>;
}


export const loader = async () => {
    const menu = await getMenu()
    return menu
}

export default Menu;
