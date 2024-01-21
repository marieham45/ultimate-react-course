import ButtonToggle from "./ButtonToggle";
import React, {useState} from "react";

const Box = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <ButtonToggle onOpen={setIsOpen}/>
            {isOpen && children}
        </div>
    );
};

export default Box;