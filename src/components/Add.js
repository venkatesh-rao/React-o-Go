import React from 'react';

export default class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            isbn: "",
            title: "",
            authors:"",
            price:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.isSuccess=null;
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state, null, "");
        fetch('http://34.217.194.59/api/books', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => {
            console.log("Book added Successfully !...");
            alert("Book added Successfully !...");
        })
        .catch(err => {
            console.log('[error while adding book]', err);
            alert("Failed !");
        });
    }

    render(){
        return(
            <div>
                <form id="form1" onSubmit={this.handleSubmit}>
                    <div style={{ postion: 'relative', left: '50%', transform: 'translate(-50%, 20%)' }} className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN Number</label>
                        <input className="form-control" type="text" id="isbn" placeholder="ISBN Number" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">TITLE</label>
                        <input className="form-control" type="text" id="title" placeholder="Title of the Book" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="authors">AUTHORS</label>
                        <input className="form-control" type="text" id="author" placeholder="Author Name" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">PRICE</label>
                        <input className="form-control" type="text" id="price" placeholder="Price" onChange={this.handleChange}/>
                    </div>
                    
                        <button style={{width: '100%'}} className="btn btn-success btn-sm" type="submit">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}