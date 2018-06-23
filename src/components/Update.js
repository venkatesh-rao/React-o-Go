import React from 'react';

export default class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            bookData: {},
            isFound: false,
            findIsbn: "",
        }   
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFind=this.handleFind.bind(this);
    }

    handleChange(e) {
        this.setState({
            bookData: {
                ...this.state.bookData,
                [e.target.id]: e.target.value
            }
    });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state.bookData, null, "");
        fetch(`http://localhost:1234/books/${this.state.findIsbn}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //mode: 'no-cors',
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => {
            console.log("Book Updated Successfully !...");
            alert("Book Updated Successfully !...");
        })
        .catch(err => {
            console.log('[error while adding book]', err);
            alert("Failed !");
        });
    }

    handleFind = e => {
        e.preventDefault();
        fetch(`http://localhost:1234/books/${this.state.findIsbn}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(results => results.json())
        .then(json => {
            if (json !== null) {
                this.setState({
                    bookData: json[0],
                    isFound: true,
                });
                console.log('[json]', json)
                console.log('[bookData]', this.state.bookData)
            } else {
              console.log('Book Not Found');
              alert('Sorry, the Required Book Does not Exist in our Database.');
            }
        })
        .catch(err => { 
            console.log('request failed', err);
            alert('Request Failed');
        });
    }

    render(){
        console.log(this.state.bookData)
        console.log(this.state)
        return(
            <div>
                {this.setState.findIsbn}
                {this.state.isFound === false ? 
                (<form id="formFind" onSubmit={this.handleFind}>
                    <div style={{ postion: 'relative', left: '50%', transform: 'translate(-50%, 20%)' }} className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="findIsbn">ISBN</label><br/>
                        <input className="form-control form-control-sm" type="text" onChange={(e) => this.setState({findIsbn: e.target.value})} id="findIsbn" placeholder="ISBN Number" />
                    </div>
                        <div className="form-group">
                        <button style={{ width: '100%' }} className="btn btn-success btn-sm" type="submit">Find</button>
                    </div>
                    </div>
                </form>) 
                : 
                (<form id="formUpdate" onSubmit={this.handleSubmit}>
                    <div style={{ postion: 'relative', left: '50%', transform: 'translate(-50%, 20%)' }} className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN Number</label>
                        <input className="form-control" type="text" id="isbn" placeholder="ISBN Number" value={this.state.bookData.isbn} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">TITLE</label>
                        <input className="form-control" type="text" id="title" placeholder="Title of the Book" value={this.state.bookData.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="authors">AUTHORS</label>
                        <input className="form-control" type="text" id="authors" placeholder="Author Name" value={this.state.bookData.authors} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">PRICE</label>
                        <input className="form-control" type="text" id="price" placeholder="Price" value={this.state.bookData.price} onChange={this.handleChange} />
                    </div>
                    
                        <button style={{width: '100%'}} className="btn btn-success btn-sm" type="submit">Add</button>
                    </div>
                </form>
            )}
            </div>
        );
    }
}