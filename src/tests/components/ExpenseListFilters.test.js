import React from 'react';
import {shallow} from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter} 
            sortByDate={sortByDate} 
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
})
test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})
test('should render ExpenseListFilters with altData correctly', () => {
    wrapper.setProps({
        filters:altFilters
    });
    expect(wrapper).toMatchSnapshot();
})
// ***** assert something about the spies making sure the correct data called
// should handle text change - does it call correct prop
test('should handle text change', () => {
    const value = 'rent'
    wrapper.find('input').simulate("change", { 
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith( value )
})
// should sort by date - need to simualte a change on select
test('should sort by date', () => {
    // it's date by default so altFilters makes it amount
    const value = 'date'
    wrapper.setProps({
        filters:altFilters
    });
    wrapper.find('select').simulate('change', { 
        target: { value }
    })
    // not called with anything
    expect(sortByDate).toHaveBeenCalled()
})
// should sort by amount
test('should sort by amount', () => {
    // it's date by default so altFilters makes it amount
    const value = 'amount'
    wrapper.find('select').simulate('change', { 
        target: { value }
    })
    // not called with anything
    expect(sortByAmount).toHaveBeenCalled()
})

// should handle date changes
test('should handle date changes', () => {
    const startDate = moment(0).add(13, 'years');
    const endDate = moment(0).add(33, 'years');
    // was failing before adding withStyles - not sure why this works
    // although snap test files add this so perhaps it's just more explicit
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})


// ***** assert something about the state.
// ***** simulate change to select by using simulate and change event and provide something 
// ***** for e.target .value
// should handle date focus changes
test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')( calendarFocused )
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})