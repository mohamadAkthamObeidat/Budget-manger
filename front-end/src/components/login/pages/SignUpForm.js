import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      name: "",
      income: 0,
      saving: 0,
      currency: "",
      hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Submit", this.state);

    axios.post("/signUp", this.state).then(response => {
      console.log("Res:", response.data);
    });
  }

    
    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} required/>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange}required />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange}required />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="number">Your Monthly Income</label>
                <input type="number" className="FormField__Input"  placeholder="Enter your Monthly Income" name="income" value={this.state.income} onChange={this.handleChange}required  min = "50"/>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="number">Your Monthly Saving</label>
                <input type="number" className="FormField__Input"  placeholder="Enter your Monthly Income" name="saving" value={this.state.saving} onChange={this.handleChange}required max = {this.state.income*0.20} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="Currency">Currency</label>
                <input type="radio"   className="Currency" value="USD" onChange={this.handleChange} name = "currency"/>USD
                <input type="radio"   className="Currency" value="JOD" onChange={this.handleChange} checked name = "currency"/>JOD 
              </div>

 

export default SignUpForm;
