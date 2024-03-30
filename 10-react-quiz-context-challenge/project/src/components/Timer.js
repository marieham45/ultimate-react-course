import {useEffect} from 'react';
import {useQuiz} from "../context/QuizContext";

const Timer = () => {
    const {dispatch, secondsRemaining} = useQuiz()
    const mins = Math.floor(secondsRemaining / 60)
    const secs = secondsRemaining % 60

    useEffect(() => {

        const tickFunction = setInterval(() => {
             dispatch({type: "tick"})


         }, 1000)

        return () => clearInterval(tickFunction)

    }, [dispatch])

    return (
        <div className="timer">
            {mins < 10 && 0}{mins}:{secs < 10 && 0}{secs}
        </div>
    );
};

export default Timer;