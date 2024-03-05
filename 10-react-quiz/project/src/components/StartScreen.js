import React from 'react';

const StartScreen = ({questionsNum, dispatch}) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questionsNum} questions to test your React mastery</h3>
            <button onClick={() => dispatch({type: "start"})
            } className="btn btn-ui">Let's start!
            </button>
        </div>
    );
};

export default StartScreen;