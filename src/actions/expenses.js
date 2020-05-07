import { v4 as uuidv4 } from 'uuid';

//action generators
// add expense
// first here are the arguements coming in and then their defaults
// the empty array is the default for the entire set of arguements within the object arguement
export const addExpense = (
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
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
// edit expense
export const editExpense = ( id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})