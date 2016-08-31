import React from 'react';
import { Link } from 'react-router';

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expense: null, editView: false, addView: false };
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/api/expense',
      type: 'GET',
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense });
    }).fail( data => {
      console.log(data);
    });
  }

  toggleAdd() {
    this.setState({ addView: !this.state.addView });
  }

  handleAdd(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let est_amount = this.refs.estAmount.value;
    let act_amount = this.refs.actAmount.value;
    let paid = this.refs.paid.value;

    $.ajax({
      url: `/api/expense/${this.state.expense.id}`,
      type: 'POST',
      data: { expense: { name, est_amount, act_amount, paid } },
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense, editView: false });
    }).fail( data => {
      console.log( data )
    });
  }

  toggleEdit() {
    this.setState({ editView: !this.state.editView });
  }

  handleEdit(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let est_amount = this.refs.estAmount.value;
    let act_amount = this.refs.actAmount.value;
    let paid = this.refs.paid.value;

    $.ajax({
      url: `/api/expense/${this.state.expense.id}`,
      type: 'PUT',
      data: { expense: { name, est_amount, act_amount, paid } },
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense, editView: false });
    }).fail( data => {
      console.log( data )
    });
  }

  displayCards() {
    return this.state.expense.map( expense => {
      return(
        <div key={`expense-${expense.id}`}>
<<<<<<< HEAD
          <div className='row valign-wrapper' >
            <table>
              <tbody>
                <tr>
                  <td>{expense.name}</td>
                  <td>${expense.est_amount}.00</td>
                  <td>${expense.act_amount}.00</td>
                  <td>
                    <form action="#">
                      <p>
                        <input type="checkbox" id="paid" />
                        <label for="paid"></label>
                      </p>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
=======
          <div className='col s12 m6'>
            <div className='card medium light-green darken-3'>
              <div className='card-content white-text'>
                <span className='card-title white-text'>{expense.name}</span>
                <div>
                  <label className='white-text'>Estimated Amount:</label>
                  <p className='white-text'>${expense.est_amount}</p>

                  <label className='white-text'>Actual Amount:</label>
                  <p className='white-text'>${expense.act_amount}</p>

                  <label className='white-text'>Paid:</label>
                  <p className='white-text'>{expense.paid}</p>
                </div>
                <div className='card-action'>
                  <Link to='/' className='btn'>Budget</Link>
                  <button className='btn' onClick={this.toggleEdit}>Edit</button>
                  <button className='btn'>Add Expense</button>
                </div>
              </div>
            </div>
>>>>>>> mara
          </div>
        </div>
      )
    });
  }

  render() {
    if(this.state.editView) {
      return(
        <div className="col s12 m6">
          <div className="card light-green darken-3">
            <div className="card-content">
              <h5>Edit Expense: {this.state.expense.name}</h5>
              <form onSubmit={this.handleEdit.bind(this)} >
<<<<<<< HEAD
                <input ref='name' type='text' placeholder='Name' defaultValue={this.state.expense.name} />
                <input ref='est_amount' type='text' placeholder='Estimated Amount' defaultValue={this.state.expense.est_amount} />
                <input ref='act_amount' type='text' placeholder='Actual Amount' defaultValue={this.state.expense.act_amount} />
                <input ref='paid' type='text' placeholder='Paid' defaultValue={this.state.expense.paid} />
=======
                <input ref='name'type='text' placeholder='Name' defaultValue={this.state.expense.name} />
                <input ref='est_amount'type='text' placeholder='Estimated Amount' defaultValue={this.state.expense.est_amount} />
                <input ref='act_amount'type='text' placeholder='Actual Amount' defaultValue={this.state.expense.act_amount} />
                <input ref='paid'type='text' placeholder='Paid' defaultValue={this.state.expense.paid} />
>>>>>>> mara
                <input type='Submit' defaultValue='Update Expense' className='btn' />
                <button type='button' onClick={this.toggleEdit} className='btn grey'>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      if(this.state.expense) {
        return(

            <div className='col s12 m6'>
              <div className='card light-green darken-3'>
                <div className='card-content white-text'>
                  <h4>Expenses:</h4>
                  <table>
                  <thead>
                    <tr>
                      <th data-field="id">Name</th>
                      <th data-field="name">Estimated Amount</th>
                      <th data-field="price">Actual amount</th>
                      <th data-field="paid">Paid</th>
                    </tr>
                  </thead>
                </table>
                  <span>{this.displayCards.bind(this)()}</span>
                  <div className='card-action'>
                    <Link to='/' className='btn'>Budget</Link>
                    <button className='btn' onClick={this.toggleEdit}>Edit</button>
                    <button className='btn'>Add Income</button>
                  </div>
                </div>
              </div>
            </div>

        )
      } else {
        return(
          <div className='row'>
            <h3 className='center'>Expense Not Loaded...</h3>
          </div>
        )
      }
    }
  }
}

export default Expense;
