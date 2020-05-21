import React from 'react'
import { connect } from "react-redux";
import { DateRangePicker } from 'react-dates';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }
    render(){
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value))
                    }}
                />
                <select 
                    value={this.props.filters.sortBy} 
                    onChange={(e) => {
                    e.target.value === "date" 
                        ? this.props.dispatch(sortByDate()) 
                        : this.props.dispatch(sortByAmount())
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={'startmcStartfaceid-1234'}
                    endDate={this.props.filters.endDate}
                    endDateId={'endyymcEndfaceid-5678'}
                    onDatesChange={this.onDatesChange} // onChange change createdAt value to new date value
                    focusedInput={this.state.calendarFocused} 
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}
export default connect(mapStateToProps)(ExpenseListFilters);