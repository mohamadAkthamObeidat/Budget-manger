import React, { Component } from 'react'
import axios from 'axios';
export default class search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: "text",
            submitHandler: ""

        }

    }

    handleChange = (e) => {
        this.setState({ term: e.target.value })

    }


    submitHandler = (e) => {
        e.preventDefault();

        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                console.log(res.data)
            })

    }


    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input id="search" type="search" className="input"
                        onChange={this.handleChange} placeholder="Search..." />
                    <button onClick={this.submitHandler}>Search</button>
                </form>
            </div>
        )
    }
}
