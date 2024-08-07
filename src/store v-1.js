import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createAccount":
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullname: action.payload };
    default:
      return state;
  }
}

// combine reducers to a root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

console.log("hii redux");
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buying a car" },
// });
// console.log(store.getState());

//! creating action creator functions
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());

//! action creator functions for customer

function createAccount(fullname, nationalID) {
  return {
    type: "customer/createAccount",
    payload: { fullname, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullname) {
  return {
    type: "customer/updateName",
    payload: fullname,
  };
}

store.dispatch(createAccount("Dikshant", "123456789"));
console.log(store.getState());