import {useQuiz} from "../context/QuizContext";

const NextButton = () => {
    const {dispatch, answer, index, questionsNum} = useQuiz()

    if (answer === null) return null
    if (index === questionsNum - 1) {
        return (
            <button className="btn btn-ui"
                    onClick={() =>
                        dispatch({type: "finish"})

                    }
            >
                Finish
            </button>
        );
    }
    return (
        <button className="btn btn-ui"
                onClick={() => dispatch({type: "nextQuestion"})}
        >
            Next
        </button>
    );
};

export default NextButton;