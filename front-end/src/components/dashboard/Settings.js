import React, { Component } from "react";
state = {
  newValue: {
    Salary: currentSalary,
    saving: savingaChinge
  }
};

salaryChange = salary => {
  Axios.post('/settings', {balance: salary,balance:saving})
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err));
};

handleAdd = (e) => {
  e.preventDefault();

  const salary = document.getElementById("salary").value;
  this.salaryChange(salary);
}


export default class Settings extends Component {
  render() {
    return <div>
       <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Your Balance And Saving</h5>
            </div>
            <div className="modal-body">
              {/* <h5>balance</h5> */}
              {/* <h6 className="date"> </h6> */}
              <form>
                <div className="Balance">
                  <label className="Balance-lbl">balance</label>
                  <input
                    name="Balance"
                    className="inputs"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="salare"
                    value= {balance}
                  ></input>
                </div>
                <div className="value">
                  <label className="value-lbl"> Saving</label>
                  <input
                    id="salary"
                    name="value"
                    className="inputs value-input"
                    // onChange={this.handleChange}
                    type="text"
                    placeholder="0000 JD"
                    value={value}
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancle
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleAdd}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
