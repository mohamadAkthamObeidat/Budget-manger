import React, { Component } from "react";
import Sidebar from "./dashboard/sidebar";
import "../Style/search.css";
import "../Style/Dashboard.css";
import axios from "axios";
import Row from "./dashboard/Row";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Mohammad Obeidat",
      balance: 0,
      currency: "JD",
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
          saving: response.data.saving,
          expenses: response.data.expenses
        });
      })
      .catch(error => {
        console.log("NO DATA FETCHED :", error);
      });
    // })
  };

  deleteExpense = (expenseID, value) => {
    // debugger;
    const userID = this.props.userData[0]._id;
    axios
      .delete(
        `/deletesearch/${expenseID}/${userID}/${this.state.term}/${value}`
      )
      .then(response => {
        console.log("RESULT FROM DELETE REACT", response);
        this.setState({
          ...this.state,
          expenses: response.data,
          balance: this.state.balance + value
        });
      })
      .catch(error => {
        console.log("NO DATA FETCHED", error);
      });
  };

  handleChange = e => {
    this.setState({ term: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const data = { ...this.state, id: this.props.userData[0]._id };
    axios.post(`/search`, data).then(res => {
      console.log(res.data);
      this.setState({ ...this.state, expenses: res.data });
    });
  };

  render() {
    // console.log(this.props.userData);
    // console.log("EXPENSES FROM RENDER", this.state.expenses);
    // console.log("USER EXPENSES FROM RENDER", this.state.userExpenses);
    const { date, title, value } = this.state.newExpense;
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

        <div className="search">
          <form onSubmit={this.submitHandler}>
            <input
              id="search"
              type="search"
              className="input"
              onChange={this.handleChange}
              placeholder="Search..."
            />
            <button className="update-btn" onClick={this.submitHandler}>
              Search
            </button>
          </form>
        </div>

        {this.state.expenses.length === 0 ? (
          <img className="empty" src={require("../Assets/empty.svg")} alt="" />
        ) : (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <td scope="col">Date</td>
                <td scope="col">Title</td>
                <td scope="col">Value</td>
                <td scope="col">Delete</td>
              </tr>
            </thead>
            <tbody>
              {this.state.expenses.map(element => (
                <Row
                  key={element._id}
                  expenses={element}
                  edit={this.updateExpenses}
                  remove={this.deleteExpense}
                  user={this.state._id}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Dashboard;

///////////////////////////////////////////////////////
