import React, { Component } from 'react';
import '../../Style/PaymentModal.css'


let today = new Date();
let currentDate = today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getFullYear();

class PaymentModal extends Component {

    state = {
        newExpense: {
            date: currentDate,
            expense: '',
            value: 0
        }
    }

    //Store Input values In State 
    handleChange = (event) => {
        this.setState({
            newExpense: {
                ...this.state.newExpense, // Copy The Entire Object In That State.
                [event.target.name]: event.target.value // Change Name And Value Depend On Input Change Status.
            }
        })
    }

    //Clear Input Fields After Adding New Expense.
    clearInputs = () => {
        this.setState({
            // Change Value Of Specific Keys in Key inside State.
            newExpense: {
                expense: '',
                value: ''
            }
        })
    }

    //Send State Values To 'Dashboard.js' Component.
    handleAdd = (event) => {
        event.preventDefault();
        this.props.create(this.state.newExpense, this.clearInputs)
    }


    render() {
        const { expense, value } = this.state.newExpense
        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add a Payment</h5>
                        </div>
                        <div className='modal-body'>
                            <h6 className="date"> {currentDate} </h6>
                            <form >
                                <div className="expenses">
                                    <label className="expenses-lbl">Expenses</label>
                                    <input name='expenses' className='inputs' onChange={this.handleChange} type='text' placeholder='Ex: Bills..' value={expense}></input>
                                </div>
                                <div className="value">
                                    <label className="value-lbl">Value</label>
                                    <input name='value' className='inputs value-input' onChange={this.handleChange} type='text' placeholder='22 JD' value={value}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Add</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default PaymentModal;
