import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetBook extends Component {
    constructor(props) {
        super();
        this.state = {
            id: null,
            book: null
        }
    }

    onChange = (event) => {
        this.setState({ id: event.target.value });
    }

    getBookById = (event) => {
        event.preventDefault();
        if (!this.state.id || this.state.id.trim().length === 0) {
            alert("id cannot empty!")
            return;
        }

        fetch(`/books/${this.state.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .then(response => this.setState({ book: response.data }))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Get a book with Id</Card.Title>
                    <Form className="form-inline">
                        <label className="sr-only">Id</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Id" required onChange={this.onChange} />
                        <Button type="button" className="btn btn-info" onClick={this.getBookById}>Get by Id</Button>
                    </Form>
                    <span>
                        {this.state.book
                            ? <ul>
                                <li>Id: {this.state.book._id}</li>
                                <li>Title: {this.state.book.title}</li>
                            </ul>
                            : "No book requested!"}
                    </span>
                </Card.Body>
            </Card>
        );
    }
}

export default GetBook;