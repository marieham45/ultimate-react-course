import {useQuiz} from "../context/QuizContext";

const Progress = () => {
    const {index, points, maxPoints, answer, questionsNum} = useQuiz()

    return (
        <header className="progress">
            <progress max={questionsNum} value={answer ? index + 1 : index}>
            </progress>
                <p>Question <strong>{index + 1}</strong>/{questionsNum}</p>
                <p> <strong>{points ? points : 0}</strong>/{maxPoints} points</p>
        </header>
    );
};

export default Progress;