import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

class DeleteBook extends Component {
    constructor(props) {
        super();
        this.state = {
            books: [],
            id: ''
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

        if (this.state.id.length === 0)
            return;

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
            .then(response => { console.log(response); this.setState({ book: response.data }) })
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Delete a book with Id</Card.Title>
                    <Form className="form-inline">
                        <label className="sr-only">Id</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Id" required onChange={this.onChange} />
                        <Button type="submit" className="btn btn-danger" onClick={this.deleteBook}>Delete by Id</Button>
                    </Form>
                    <ul>
                        {
                            this.state.books.map((book) => {
                                return <li key={book._id}>Book Id: {book._id}, Title: {book.title}</li>
                            })
                        }
                    </ul>
                </Card.Body>
            </Card>
        );
    }
}

export default DeleteBook;