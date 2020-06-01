import moment from 'moment';
import expensesReducer from '../../reducers/expenses';

// imports dummy data from fixtures
import expenses from '../fixtures/expenses';

// default sets an empty array
test('should set default state', () => {
    const state = expensesReducer( undefined, { type: '@@INIT' });
    expect(state).toEqual([])
})

// Remove expense
test('should remove an expense by ID', () => {
    const action = { 
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer( expenses, action );
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expenses if ID not found', () => {
    const action = { 
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer( expenses, action );
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
})

// edit expense
test('should edit an expense by matching ID', () => {
    const amount = 1000005;
    const action = { 
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer( expenses, action );

    // need to define that second item now has a different amount value
    expect(state[1].amount).toBe(action.updates.amount)
})

test('should not edit expenses if ID not found', () => {
    const amount = 1000005;
    const action = { 
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount
        }
    };
    const state = expensesReducer( expenses, action );
    expect(state).toEqual(expenses)
})

// Add expense
test('should add an expense', () => {
    const expense = {
        id: '123',
        description: 'Laptop',
        note: 'Needed a new one',
        amount: 109500,
        createdAt: 20000
    }
    const action = { 
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense])
})