import React from 'react'
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

const now = moment();
// console.log(now.format('MMMM Do YYYY'));




export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note:  props.expense ? props.expense.note : '',
            amount:  props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt:  props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
    // **********************************
    // could do it without constructor
    // **********************************
    // state = {
    //     description: this.props.expense ? this.props.expense.description : '',
    //     note:  this.props.expense ? this.props.expense.note : '',
    //     amount:  this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    //     createdAt:  this.props.expense ? moment(props.expense.createdAt) : moment(),
    //     calendarFocused: false,
    //     error: ''
    // }
    // these functions can all be called handlers which are called in props
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }))
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) && this.setState(() => ({ amount }))
    }
    // the api for onDateChange allows you to pass in the actual moment/date chosen which can be 
    // called anything. So we'll call it createdAt as that's what we've used before
    onDateChange = (createdAt) => {
        // this.setState({ createdAt: date })
        // createdAt has been destructured as the key and value have the same name
        if( createdAt ) {
            this.setState(() => ({ createdAt }))
        }
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(() => ({ error: 'Please provide description and amount' }))
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
            // console.log(this.state, ' the state from expenseForm');
        }
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt} //represents where you want to start
                        onDateChange={this.onDateChange} // onChange change createdAt value to new date value
                        focused={this.state.calendarFocused} 
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}