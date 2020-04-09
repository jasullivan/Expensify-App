import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';

//action generators
// add expense
// first here are the arguements coming in and then their defaults
// the empty array is the default for the entire set of arguements within the object arguement
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})
// remove expense
// id is destructured from id in the dispatch call
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
// edit expense
// set text filter
// sort by date
// sort by amount
// set start date
// set end date 

// Expenses Reducer
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            // return state.filter((expense) => {
            //     return expense.id !== action.id
            // })
            // below is from the above but destructured. individual expense is destructured so can just add {id}
            // expense is each filter iteration of the expenses array in the array object
            // if result is false corresponding expense is filtered out
            // return state.filter(({id}) => {
            //     return id !== action.id
            // })
            // can be imporved further to an implicit return
            return state.filter(({id}) => id !== action.id)
        default: 
            return state;
    }
}

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', 
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState())
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100}))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 10900}))

// console.log(expenseOne);
// console.log(expenseTwo);

store.dispatch(removeExpense({ id: expenseOne.expense.id}))

// const demoState =  {
//     expenses: [{
//         id: 'xdcfghuijkoj',
//         description: 'Jan rent',
//         note: 'This was the final payment for that address',
//         amount: 45678,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amount',
//         startDate: undefined,
//         endDate: undefined
//     }
// }