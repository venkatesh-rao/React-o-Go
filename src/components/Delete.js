import React from 'react';

export default class Delete extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isbn: ""
    };
    this.handleChange=this.handleChange.bind(this);
    this.search = null;
  }

  handleChange() {
      this.setState({
        isbn: document.getElementById("isbn").value
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.isbn !== "") {
        fetch(`http://34.217.194.59/api/books/${this.state.isbn}`, {
            method: 'DELETE',
            //mode: 'no-cors',
        })
        .then(response => {
          if (!response.ok) {
              throw Error(response.statusText);
          }
          return response;
        })
        .then(response => console.log("Book Deleted Successfully !.."))
        .catch(err => console.log('[error]', err))
    }
  }

  render() {
    return (
      <div>

        <div style={{ postion: 'relative', left: '50%', transform: 'translate(-50%, 20%)' }} className="col-md-4">
          <form id="form1" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="isbn">ISBN Number</label><br/>
              <input className="form-control form-control-sm" type="text" id="isbn" placeholder="ISBN Number" />
            </div>
            <div className="form-group">
              <button style={{ width: '100%' }} className="btn btn-success btn-sm" onClick={this.handleChange}>Delete</button>
            </div>
          </form>
        </div>

        <div style={{ padding: 10 }}>
            {this.search}
        </div>

      </div>
    );
  }
}