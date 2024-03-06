import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
    questions: [],

    // loading, error, ready, active, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0
}

const reducer = (state, action) => {

    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }
        case "dataFailed":
            return {...state, status: "error"}
        case "start":
            return {...state, status: "active"}
        case "newAnswer":
            const question = state.questions.at(state.index)

            return {...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            }
        default:
            throw new Error("Action unknown")
    }
}

function App() {
    const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState)

    const questionsNum = questions.length;

    useEffect(() => {
        // npm run server
        fetch('http://localhost:8000/questions')
            .then(res => res.json())
            .then(data => dispatch({type: "dataReceived", payload: data}))
            .catch(err => dispatch({type: "dataFailed"}))
    }, [])


    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen dispatch={dispatch} questionsNum={questionsNum}/>}
                {status === "active" && <Question
                    question={questions.at(index)}
                    dispatch={dispatch}
                    answer={answer}/>}
            </Main>
        </div>
    );
}

export default App;
