import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';

// set text filter 
test('should generate set text filter object with provided text value', () => {
    const textFilter = 'somethin in';
    const action = setTextFilter(textFilter);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        textFilter
    })
})
test('should generate set text filter object with default text value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        textFilter: ''
    })
})
// sort by date
test('should generate action object for sort by date', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})
// sort by amount
test('should generate action object for sort by amount', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})
// set start date
test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})
// set end date 
test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})