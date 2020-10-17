import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

class DeleteBook extends Component {
    constructor(props) {
        super();
        this.state = {
            id: null,
            deleted: false
        }
    }

    onChange = (event) => {
        this.setState({ id: event.target.value })
    }

    deleteBook = (event) => {
        event.preventDefault();

        const { id } = this.state;

        if (!id || id.trim().length === 0) {
            alert('id of book to be deleted cannot be empty!')
            return;
        }

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
            .then(_ => this.setState({ deleted: true }))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="d-flex container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Delete a book</Card.Title>
                    <Form className="form-inline">
                        <Form.Label className="sr-only">Id</Form.Label>
                        <Form.Control type="text" className="mb-2 mr-sm-2" placeholder="Id" onChange={this.onChange} />
                        <Button type="button" className="btn btn-danger" onClick={this.deleteBook}>Delete</Button>
                    </Form>
                    <span>{this.state.deleted ? `Deleted book with Id: ${this.state.id}. Get All again to see the new book list!` : "No books deleted yet!"}</span>
                </Card.Body>
            </Card>
        );
    }
}

export default DeleteBook;