import React, { Component } from "react";
import "../../Style/Row.css";
import PaymentModal from "./PaymentModal";

export class Row extends Component {
  state = {
    newExpense: {
      expense: "",
      value: 0
    }
  };

  //Store Input values In State
  handleChange = event => {
    this.setState({
      newExpense: {
        ...this.state.newExpense, // Copy The Entire Object In That State.
        [event.target.name]: event.target.value // Change Name And Value Depend On Input Change Status.
      }
    });
  };

  //Clear Input Fields After Adding New Expense.
  clearInputs = () => {
    this.setState({
      // Change Value Of Specific Keys in Key inside State.
      newExpense: {
        expense: "",
        value: ""
      }
    });
  };

  //Update State Values in 'Dashboard.js' Component.
  // handleEdit = event => {
  //   event.preventDefault();
  //   this.props.edit(
  //     this.props.expenses._id,
  //     this.state.newExpense,
  //     this.clearInputs
  //   );
  // };

  //Delete Specific Expense.
  handleDelete = event => {
    event.preventDefault();
    this.props.remove(this.props.expenses._id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <tr>
        <td>{expenses.date}</td>
        <td>{expenses.title}</td>
        <td>{expenses.value}</td>
        <td>
          <button onClick={this.handleDelete} className="btn btn-danger">
            {" "}
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Row;
