const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
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

// action creator functions
export const deposit = (amount) => {
    return {type: "accounts/deposit", payload: amount}
}

export const withdraw = (amount) => {
    return {type: "accounts/withdraw", payload: amount}
}

export const requestLoan = (amount, purpose) => {
    return {type: "accounts/requestLoan", payload: {amount, purpose}}
}

export const payLoan = () => {
    return {type: "accounts/payLoan"}
}

export default accountReducer