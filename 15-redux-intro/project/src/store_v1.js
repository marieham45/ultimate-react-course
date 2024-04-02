import {combineReducers, createStore} from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}

const accountReducer = (state = initialStateAccount, action) => {
    switch (action.type) {
        case "accounts/deposit":
            return {...state, balance: state.balance + action.payload}
        case "accounts/withdraw":
            return {...state, balance: state.balance - action.payload}
        case "accounts/requestLoan":
            if (state.loan > 0) return state
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case "accounts/payLoan":
            return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan}
        default:
            return state
    }
}

const customerReducer = (state = initialStateCustomer, action) => {
    switch (action.type) {
        case "customer/createCustomer":
            return {...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt}
        case "customer/updateName":
            return {...state, fullName: action.payload}
        default: return state
    }
}


const rootReducer = combineReducers({account: accountReducer, customer: customerReducer})
const store = createStore(rootReducer)

// store.dispatch({type: "accounts/deposit", payload: 500})
// console.log(store.getState())
//
// store.dispatch({type: "accounts/requestLoan", payload: {amount: 1000, purpose: "Buy a car"}})
// console.log(store.getState())
//
// store.dispatch({type: "accounts/payLoan"})
// console.log(store.getState())


// action creator functions
const deposit = (amount) => {
    return {type: "accounts/deposit", payload: amount}
}

const withdraw = (amount) => {
    return {type: "accounts/withdraw", payload: amount}
}

const requestLoan = (amount, purpose) => {
    return {type: "accounts/requestLoan", payload: {amount, purpose}}
}

const payLoan = () => {
    return {type: "accounts/payLoan"}
}

const createCustomer = (fullName, nationalID) => {
    return {type: "customer/createCustomer", payload: {fullName, nationalID, createdAt: new Date().toISOString()}}
}

const updateName = (fullName) => {
    return {type: "customer/updateName", payload: fullName}
}

store.dispatch(deposit(500))
console.log(store.getState())

store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(1000, "Buy a car"))
console.log(store.getState())

store.dispatch(payLoan())
console.log(store.getState())

store.dispatch(createCustomer("Marie Hamsikova", "123456789"))
console.log(store.getState())

store.dispatch(updateName("Masenka Hamsikova"))
console.log(store.getState())
