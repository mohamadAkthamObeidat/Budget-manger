import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Sidebar from "./sidebar";
import "../../Style/Dashboard.css";
import PaymentModal from "./PaymentModal";
import axios from "axios";
import Row from "./Row";
export class Dashboard extends Component {
  state = {
    userName: "Mohammad Obeidat",
    balance: 0,
    currency: "JD",
    expenses: []
  };

  //@METHOD GET
  //Return All Expenses From Database.
  getExpenses = () => {
    axios
      .get("/expenses")
      .then(response => {
        this.setState({ expenses: response.data });
      })
      .catch(error => {
        console.log("NO DATA FETCHED :", error);
      });
  };

  //@METHOD POST
  //Add New Expense to Database.
  addExpenses = (newExpense, clearInputs) => {
    axios
      .post("/expenses", newExpense)
      .then(response => {
        this.setState({ expenses: response.data });
      })
      .catch(error => {
        console.log("NO DATA FETCHED :", error);
      });
    clearInputs();
  };

  //@METHOD PUT
  //Update Specific Expense.
  updateExpenses = (expenseID, newData, clearInputs) => {
    axios
      .put(`/expenses/${expenseID}`, newData)
      .then(response => {
        this.setState({
          expenses: response.data
        });
      })
      .catch(error => {
        console.log("NO DATA FETCHED", error);
      });
    clearInputs();
  };

  //@METHOD DELETE
  //Delete Specific Expense From Database.
  deleteExpense = expenseID => {
    axios
      .delete(`/expenses/${expenseID}`)
      .then(response => {
        this.setState({
          expenses: response.data
        });
      })
      .catch(error => {
        console.log("NO DATA FETCHED", error);
      });
  };

  render() {
    return (
      <div className="body">
        <Sidebar />
        <div className="user-info">
          <h2 className="user-name">{this.state.userName}</h2>
          <p className="balance">
            Current Balance: {this.state.balance} {this.state.currency}{" "}
          </p>
        </div>

        <div className="add-payment">
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={this.addPaymentHandler}
          >
            {" "}
            <img src={require("../../Assets/cash.svg")} alt="" /> Add a Payment
          </button>
        </div>
        {this.state.expenses.length === 0 ? (
          <img
            className="empty"
            src={require("../../Assets/empty.svg")}
            alt=""
          />
        ) : (
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Expenses</td>
                <td>Value</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {this.state.expenses.map(element => (
                <Row
                  key={element._id}
                  expenses={element}
                  edit={this.updateExpenses}
                  remove={this.deleteExpense}
                />
              ))}
            </tbody>
          </table>
        )}
        <PaymentModal create={this.addExpenses} />
      </div>
    );
  }
}

export default Dashboard;