import React from 'react';
import { connect } from "react-redux";
import ExpenseForm from './ExpenseForm.js';
import { editExpense, removeExpense } from '../actions/expenses';
// refractor editExpensePahe to be a class based component
// set up mapdispatchtoprops editexpense and removeexpense and pass the data through
// test case ********************
// 3 test case render edit expenspage
//snpashot

// should handle editexpense using spy

// should handle remove expesne ysing spies

//use beforeeach

export class EditExpensePage extends React.Component {
    onSubmit=(expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };
    onRemove=() => {
        this.props.removeExpense({id:this.props.expense.id});
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
            <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                {<button onClick={this.onRemove}>
                    Remove
                </button>}
            </div>
        )
    }
}
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    // these are just parameters so id, expense and data just need relevance to 
    // what'll be passed
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

// const EditExpensePage = (props) => {
//     return (
//         <div>
//            <ExpenseForm 
//                 expense={props.expense}
//                 onSubmit={(expense) => {
//                     console.log('submitting', expense)
//                     props.dispatch(editExpense(props.expense.id, expense));
//                     // dispatch the action to edit the expense
//                     props.history.push('/');
//                     // redirect to the dashboard
//                 }}
//             />
//             {<button onClick={
//                 () => {

//                     props.dispatch(removeExpense({id:props.expense.id}));
//                     props.history.push('/');
//                 }}>
//                 Remove
//             </button>}
//         </div>
        
//     )
// }

// // this returns a new prop called expense

// const mapStateToProps = (state, props) => {
//     return {
//         expense: state.expenses.find((expense) => expense.id === props.match.params.id)
//     };
// };

// export default connect(mapStateToProps)(EditExpensePage);