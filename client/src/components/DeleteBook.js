import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

class DeleteBook extends Component {
    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    deleteBook = (e, id) => {
        e.preventDefault();
        fetch(`/books/${id}`, {
            method: "DELETE",
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
                        <Button type="submit" className="btn btn-danger" onSubmit={this.deleteBook}>Delete by Id</Button>
                    </Form>
                    <span>
                        {this.state.book ? <li>deleted book: {this.state.book.title}</li> : "No book deleted"}
                    </span>
                </Card.Body>
            </Card>
        );
    }
}

export default DeleteBook;