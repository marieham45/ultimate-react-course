import Star from "./Star";
import {useState} from "react";
import PropTypes from "prop-types";

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
}

const starContainerStyle = {
    display: 'flex',
}



const StarRating = ({
                        maxRating = 10,
                        color = '#fcc419',
                        size = 48,
                        className = '',
                        messages = [],
                        defaultRating = 0,
                        onSetRating // allowing access to state
                    }) => {
    const [rating, setRating] = useState(defaultRating)
    const [tempRating, setTempRating] = useState(0)

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color,
        fontSize: size / 1.5
    }

    const handleRating = (num) => {
        setRating(num)
        onSetRating(num)
    }

    const handleHoverIn = (num) => {
        setTempRating(num)
    }

    const handleHoverOut = () => {
        setTempRating(0)
    }


    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRating}, (_, i) => <Star
                    onRating={() => handleRating(i + 1)}
                    onHoverIn={() => handleHoverIn(i + 1)}
                    onHoverOut={handleHoverOut} key={i}
                    full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                    color={color}
                    size={size}/>)}
            </div>
            <p style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : (tempRating || rating || '')}</p>
        </div>
    );
};

StarRating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string),
    defaultRating: PropTypes.number,
    onSetRating: PropTypes.func
}
export default StarRating;