import {useQuiz} from "../context/QuizContext";

const Options = ({question}) => {
    const  {dispatch, answer} = useQuiz()


    return (
        <div className="options">
            {question.options.map((option, index) => {
                return <button onClick={() => dispatch({type: "newAnswer", payload: index})}
                               className={`btn btn-option ${index === answer ? "answer" : ""} ${answer !== null ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
                               disabled={answer !== null}
                               key={option}>{option}</button>
            })}
        </div>
    );
};

export default Options;