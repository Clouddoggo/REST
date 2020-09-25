import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class DeleteBook extends Component {
    // TODO: server crashes after delete. fix
    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    componentDidMount = () => {
        fetch(`/books`, {
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
            .then(response => this.setState({ books: response.data }))
            .catch(error => console.log(error.message));
    }

    onChange = (event) => {
        this.setState({ id: event.target.value })
    }

    deleteBook = (event) => {
        event.preventDefault();
        fetch(`/books/${this.state.id}`, {
            method: "DELETE",
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
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="d-flex container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Delete a book</Card.Title>
                    <div>
                        <ul>
                            {
                                this.state.books.map((book) => {
                                    return (
                                        <li key={book._id}>
                                            <Card className="mt-2 mb-2">
                                                <Card.Body>
                                                    Id: {book._id},
                                                            Title: {book.title}

                                                    <Button type="button" className="btn btn-danger float-right" onClick={this.deleteBook}>Delete</Button>
                                                </Card.Body>
                                            </Card>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default DeleteBook;