import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

class AddBook extends Component {
    constructor(props) {
        super();
        this.state = {
            title: "",
            added: false
        };
    }

    onChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { title } = this.state;

        if (title.trim().length === 0) {
            alert("title cannot be empty!")
            return;
        }

        const body = {
            title,
        };

        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    this.setState({ added: true });
                    return response.json();
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Add book</Card.Title>
                    <Form className="form-inline">
                        <Form.Label className="sr-only">Title</Form.Label>
                        <Form.Control type="text" className="mb-2 mr-sm-2" placeholder="Title" onChange={this.onChange}
                        />
                        <Button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                    <span>{this.state.added ? `Added: ${this.state.title}. Get All again to see the added book!` : "No books added!"}</span>
                </Card.Body>
            </Card>
        );
    }
}

export default AddBook;