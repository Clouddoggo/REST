import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

class UpdateBook extends Component {
    constructor(props) {
        super();
        this.state = {
            title: null,
            id: null,
            updated: false
        };
    }

    onChange = (event, item) => {
        if (item === "title") {
            this.setState({ title: event.target.value });
        } else {
            this.setState({ id: event.target.value });
        }
    }

    updateBook = (event) => {
        event.preventDefault();
        const { title, id } = this.state;

        if (!title || !id || title.trim().length === 0 || id.trim().length === 0) {
            alert('Please enter the id and new title of the book to be updated!');
            return;
        }

        const body = {
            title,
        };

        fetch(`/books/${this.state.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .then(response => this.setState({ title: response.data.title, updated: true }))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Update book</Card.Title>
                    <Form className="form-inline">
                        <div className="input-group mb-2 mr-sm-2">
                            <input type="text" className="form-control" placeholder="Id" required onChange={(e) => this.onChange(e, "id")} />
                        </div>
                        <label className="sr-only">Title</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Title" required onChange={(e) => this.onChange(e, "title")} />
                        <Button type="button" className="btn btn-primary" onClick={this.updateBook}>Update</Button>
                    </Form>
                    <p>{this.state.updated
                        ? `Updated title of book ${this.state.id} to '${this.state.title}'. Get All again to view the new list.`
                        : "No books updated!"}</p>
                </Card.Body>
            </Card>
        );
    }
}

export default UpdateBook;