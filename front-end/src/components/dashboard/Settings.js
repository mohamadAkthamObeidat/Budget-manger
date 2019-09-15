import React, { Component } from "react";
import Sidebar from "./sidebar";
// import "../Style/Dashboard.css";
import axios from "axios";
import "../../Style/Settings.css";
export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Mohammad Obeidat",
      balance: 0,
      currency: "JD",
      saving: 0,
      income: 0,
      expenses: [],
      userExpenses: [],
      newExpense: {
        date: "",
        title: "",
        value: ""
      },
      term: "text"
    };

    this.userData = this.props.userData;
  }

  componentWillMount() {
    let userData = this.props.userData;
    console.log("setting", userData);
    if (!userData) return;
    let data = userData[0];
    this.setState({ userExpenses: data.expenses });
  }

  componentDidMount() {
    this.userData && this.getExpenses();
  }

  //@METHOD GET
  //Return All Expenses From Database.
  getExpenses = () => {
    // this.state.userExpenses.map(expenseID => {
    axios
      .get(`/expenses/${this.userData[0]._id}`)
      .then(response => {
        console.log("RESPONSE.DATA.EXPENSES :", response.data);
        this.setState({
          balance: response.data.balance,
          income: response.data.income,
          saving: response.data.saving,
          expenses: response.data.expenses
        });
      })
      .catch(error => {
        console.log("NO DATA FETCHED :", error);
      });
    // })
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    let data = { ...this.state, userID: this.props.userData[0]._id };
    axios
      .put("/info", data)
      .then(response => {
        console.log("response", response);
        console.log("SUCCESS");
        alert("Info Updated successfully");
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  render() {
    return (
      <div className="body">
        <Sidebar />
        <div className="user-info">
          <h2 className="user-name">
            {this.props.userData
              ? this.props.userData[0].name
              : this.props.history.push("/login")}
          </h2>
          <p className="balance">
            {this.props.userData
              ? `Current Balance: ${this.state.balance} ${this.props.userData[0].currency}`
              : ""}
          </p>
          <p className="balance">
            {this.props.userData
              ? `saving: ${this.state.saving} ${this.props.userData[0].currency}`
              : ""}
          </p>
        </div>
        <div className="container">
          <div>
            <label className="title-label" id="basic-addon1">
              Salary
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.income}
              type="number"
              className="form-control"
              name="income"
              placeholder="Burger"
            />
          </div>

          <div>
            <label className="title-label" id="basic-addon1">
              Saving
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.saving}
              type="number"
              className="form-control"
              name="saving"
              placeholder="22 JD"
            />
          </div>

          <button
            className="add-expense"
            onClick={this.handleUpdate}
            type="button"
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
