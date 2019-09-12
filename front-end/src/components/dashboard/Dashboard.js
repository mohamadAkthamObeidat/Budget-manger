import React, { Component } from "react";
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

  // componentDidMount() {
  //   if (!this.props.userData) {
  //     return this.props.history.push("/login");
  //   }
  //   this.getExpenses();
  // }

  //@METHOD GET
  //Return All Expenses From Database.
  getExpenses = () => {
    axios
      .get(`/expenses/${this.props.userData[0]._id}`)
      .then(response => {
        console.log('RESPONSE.DATA.EXPENSES :', response.data.expenses);
        this.setState({ expenses: response.data.expenses });
      })
      .catch(error => {
        console.log("NO DATA FETCHED :", error);
      });
  };

  //@METHOD POST
  //Add New Expense to Database.
  addExpenses = (newExpense, clearInputs) => {
    newExpense.date = Date.now();
    newExpense.user_id = this.props.userData[0]._id;
    axios
      .post("/expenses", newExpense)
      .then(response => {
        this.setState({ expenses: response.data.expenses });
      })
      .catch(error => {
        console.log("NO DATA FETCHED :", error);
      });
      clearInputs();
      this.getExpenses();
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
    console.log(this.props.userData);
    return (
      <div className="body">
        <Sidebar />
        <div className="user-info">
          <h2 className="user-name">
            {this.props.userData ? this.props.userData[0].name : "please login"}
          </h2>
          <p className="balance">
            {this.props.userData
              ? `Current Balance: ${this.props.userData[0].income} ${this.props.userData[0].currency}`
              : ""}
          </p>
        </div>

        <div className="add-payment">
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            {" "}
            <img src={require("../../Assets/cash.svg")} alt="" /> Add a Payment
          </button>
        </div>
        {this.state.expenses.length === 0 ? (<img className="empty" src={require("../../Assets/empty.svg")} alt="" />) :
          (
            <table className='table'>
              <thead className='thead-dark'>
                <tr>
                  <td scope="col">Date</td>
                  <td scope="col">Title</td>
                  <td scope="col">Value</td>
                  <td scope="col">Edit</td>
                  <td scope="col">Delete</td>
                </tr>
              </thead>
              <tbody>
                {this.state.expenses.map(element => (
                  <Row key={element._id} expenses={element} edit={this.updateExpenses} remove={this.deleteExpense} />
                ))}
              </tbody>
            </table>
          )}
        <PaymentModal addPayment={this.addExpenses} />
      </div>
    );
  }
}

export default Dashboard;
