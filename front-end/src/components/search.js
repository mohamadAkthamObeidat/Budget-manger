import React, { Component } from "react";
import axios from "axios";
import "../Style/search.css";
export default class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "text"
    };
  }

  handleChange = e => {
    this.setState({ term: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const data = { ...this.state, id: this.props.ID };
    axios.post(`/search`, data).then(res => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.submitHandler}>
          <input
            id="search"
            type="search"
            className="input"
            onChange={this.handleChange}
            placeholder="Search..."
          />
          <button onClick={this.submitHandler}>Search</button>
        </form>
      </div>
    );
  }
}
