import {useQuiz} from "../context/QuizContext";

const FinishScreen = () => {
    const {points, maxPoints, dispatch, highscore} = useQuiz()
    const percentage = (points / maxPoints) * 100
    return (
        <>
        <p className="result">
            You have scored <strong>{points}</strong> out of {maxPoints} points ({Math.ceil(percentage)} %).

        </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={
                () => dispatch({type: "restart"})}>Restart Quiz</button>
        </>
    );
};

export default FinishScreen;