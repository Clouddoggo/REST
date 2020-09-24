import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetBook extends Component {
    constructor(props) {
        super();
        this.state = {
            id: '',
            book: null
        }
    }

    onChange = (event) => {
        this.setState({ id: event.target.value });
    }

    getBookById = () => {
        fetch(`/books/${this.state.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    const { message, data } = response.json();
                    this.setState({ books: data });
                    return message;
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .then(response => this.setState({ book: response.js }))
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
                        <Button type="submit" className="btn btn-info" onClick={this.getBookById}>Get by Id</Button>
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