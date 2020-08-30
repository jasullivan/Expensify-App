import React from 'react'
import { connect } from "react-redux";
import ExpenseForm from './ExpenseForm.js'
import { addExpense } from "../actions/expenses";
import { render } from 'enzyme';


export class AddExpensePage extends React.Component {
    onSubmit=(expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <h1>Add expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit} 
                />
            </div>
        )
    }
}
// non classed based compoennt version
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add expense</h1>
//         <ExpenseForm 
//             onSubmit={(expense) => {
//                 //props.dispatch(addExpense(expense));
//                 props.onSubmit(expense);
//                 props.history.push('/');
//             }}
//         />
//     </div>
// )
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})
export default connect(undefined, mapDispatchToProps)(AddExpensePage);

// simpler version before mapsDispatchToProps used to make testing simpler
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add expense</h1>
//         <ExpenseForm 
//             onSubmit={(expense) => {
//                 console.log(expense, ' the expense from addExpensePage')
//                 props.dispatch(addExpense(expense));
//                 props.history.push('/')
//             }}
//         />
//     </div>
// )
// export default connect()(AddExpensePage);