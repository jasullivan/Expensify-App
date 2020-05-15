
import React from 'react'
import {Link} from 'react-router-dom'
// import { connect } from "react-redux"
// import { removeExpense } from "../actions/expenses"

// const ExpenseListItem = (props) => (
//   <div>
//       <h3>{props.description}</h3>
//       <p>{props.amount} - {props.createdAt}</p>
//       <p>{props.id}</p>
//       <button onClick={
//         () => {
//               props.dispatch(
//                 removeExpense({...props}))
//         }}>
//           Remove
//       </button>

//   </div> 
// )

// this is destructured from the incoming props
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
      <Link to={`/edit/${id}`}><h3>
          {description}
      </h3></Link>
      <p>{amount} - {createdAt}</p>
      {/* <button onClick={
        () => {
              dispatch(
                removeExpense({id}))
        }}>
          Remove
      </button> */}

  </div> 
)
// export default connect()(ExpenseListItem);
export default ExpenseListItem;