import {createStore} from 'redux'

// Action generators
// incrementBy has been destructured from the arguements object
// incrementBy has been given a default value while if incrementCount
// doesn't have an arguement value then it is given an empty object.
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
    // incrementBy: incrementBy
    // incrementBy: typeof incrementBy === 'number' ? incrementBy : 1
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count }) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
})

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            // const incrementBy = typeof action.incrementBy === 'number' 
            // ? action.incrementBy : 1;
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
}
const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

// increment
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// })

// Action generators
store.dispatch(incrementCount({
    incrementBy: 5
}))

store.dispatch(incrementCount())

// unsubscribe();

// reset
store.dispatch(resetCount())

// decrement
store.dispatch(decrementCount({
    decrementBy: 1
}))
// store.dispatch({
//     type: 'DECREMENT'
// })

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
})

// store.dispatch({
//     type: 'SET',
//     count: 101
// })
store.dispatch(setCount({
    count: 101
}))

// console.log(store.getState())
