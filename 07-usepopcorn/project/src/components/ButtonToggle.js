import React from 'react';

const ButtonToggle = ({onOpen}) => {
    return (
        <button
            className="btn-toggle"
            onClick={() => onOpen((open) => !open)}
        >
            {onOpen ? "–" : "+"}
        </button>
    );
};

export default ButtonToggle;