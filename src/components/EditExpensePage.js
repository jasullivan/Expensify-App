import React from 'react';
import { connect } from "react-redux";
import ExpenseForm from './ExpenseForm.js';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>
           <ExpenseForm 
                expense={props.expense}
                onSubmit={(expense) => {
                    console.log('submitting', expense)
                    props.dispatch(editExpense(props.expense.id, expense));
                    // dispatch the action to edit the expense
                    props.history.push('/');
                    // redirect to the dashboard
                }}
            />
            {<button onClick={
                () => {

                    props.dispatch(removeExpense({id:props.expense.id}));
                    props.history.push('/');
                }}>
                Remove
            </button>}
        </div>
        
    )
}

// this returns a new prop called expense

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(EditExpensePage);