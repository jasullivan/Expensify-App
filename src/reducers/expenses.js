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

export default expensesReducer;