import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetBook extends Component {
    constructor(props) {
        super();
        this.state = {
            books: [],
            id: '',
            book: null
        }
    }

    getBookById = () => {
        const url = `/books/${this.state.id}`;
        fetch(url, {
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
            .then(response => this.setState({ book: response }))
            .catch(error => console.log(error.message));
    }

    getBooks = () => {
        const url = `/books`;
        fetch(url, {
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
            .then(response => this.setState({ books: response }))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Get book(s)</Card.Title>
                    <Form className="form-inline">
                        <label className="sr-only">Id</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Id" />
                        <Button className="btn btn-info" onClick={this.getBooks}>Get by Id</Button>
                        <span className="mr-5 ml-5">OR</span>
                        <Button className="btn btn-info float-left m-2" onClick={this.getBookById}>Get all</Button>
                    </Form>
                    <ul>
                        {
                            this.state.books.map((book, _) => {
                                return <li>
                                    book
                                </li>
                            })
                        }
                    </ul>
                </Card.Body>
            </Card>
        );
    }
}

export default GetBook;