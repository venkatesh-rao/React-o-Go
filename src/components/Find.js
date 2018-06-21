import React from 'react';
//import './Find.css';

export default class Find extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isbn: "",
      books: []
    };
    this.handleChange=this.handleChange.bind(this);
    this.search = null;
  }

  handleChange = (e) => {
      this.setState({
        isbn: e.target.value
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.isbn.length === 5) {
      fetch(`http://34.217.194.59/api/books/${this.state.isbn}`)
        .then(response => {
          if (!response.ok) {
              throw Error(response.statusText);
          }
          return response;
        })
        .then(results => results.json())
        .then(json => {
            this.setState({books: json});
            if (json !== null) {
              console.log('Book Found !');
            } else {
              console.log('Book Not Found');
              alert('Sorry, the required book Not Found in our Database.');
            }
        })
        .catch(err => { 
            console.log('request failed', err);
            alert('Request Failed');
        });                 
    }
    else {
      alert("Enter a valid 5-Digit ISBN Number");
    }
  }

  render() {
    return (
      <div style={{ flex: 2, flexDirection: 'column' }}>

        <div style={{ flex: 1, postion: 'relative', left: '50%', transform: 'translate(-50%, -3%)' }} className="col-md-4">
          <form id="form1" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label><br/>
              <input className="form-control form-control-sm" type="text" onChange={this.handleChange} id="isbn" placeholder="ISBN Number" />
            </div>
            <div className="form-group">
              <button style={{ width: '100%' }} className="btn btn-success btn-sm" type="submit">Find</button>
            </div>
          </form>
        </div>
        <div style={{padding: 10, paddingTop: 20}}>
          <table className="table table-bordered table-hover">
            <thead><tr><th>ISBN NUMBER</th><th>TITLE OF THE BOOK</th><th>AUTHORS</th><th>COST</th></tr></thead>
            <tbody>{this.state.books !== null ? (this.state.books.map(function(item, key) {
                    return (
                        <tr key = {key}>
                            <td>{item.isbn}</td>
                            <td>{item.title}</td>
                            <td>{item.authors}</td>
                            <td>{item.price}</td>
                        </tr>
                        )
                    })) : (
                      <tr><td colSpan="4">...No Such Books...</td></tr>
                    ) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}