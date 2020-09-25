import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

class UpdateBook extends Component {
    // TODO: fix required field. Problem: if use submit, page will refresh due to boostrap. But if dont use, required doesn't work
    constructor(props) {
        super();
        this.state = {
            book: null,
            id: null
        };
    }

    onChange = (event, item) => {
        if (item === "title") {
            this.setState({ book: event.target.value });
        } else {
            this.setState({ id: event.target.value });
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { title } = this.state;

        if (title.length === 0) {
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
            .then(response => this.setState({ book: response.data }))
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
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form>
                    <span>{this.state.book
                        ? `Updated book - Id: ${this.state.id}, Title: ${this.state.title}`
                        : this.state.id ? "Please enter valid id!" : "No books updated!"}</span>
                </Card.Body>
            </Card>
        );
    }
}

export default UpdateBook;