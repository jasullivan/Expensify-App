import React from 'react'
import { connect } from "react-redux";
import ExpenseForm from './ExpenseForm.js'
import { addExpense } from "../actions/expenses";

const AddExpensePage = (props) => (
    <div>
        <h1>Add expense</h1>
        {/* // expense is a parameter so can be named anything */}
        <ExpenseForm 
            onSubmit={(expense) => {
                console.log(expense, ' the expense from addExpensePage')
                props.dispatch(addExpense(expense));
                props.history.push('/')
            }}
        />
    </div>
)

export default connect()(AddExpensePage);