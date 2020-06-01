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
const editExpense = ( id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
  
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
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
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
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.textFilter
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default: 
            return state;
    }
}

// Store creation
// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses , ' visibleExpenses from redux-expensify')
    // console.log(state)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000}))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1000}))

// store.dispatch(removeExpense({ id: expenseOne.expense.id}))

// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('fe'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(-200))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1110))

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

