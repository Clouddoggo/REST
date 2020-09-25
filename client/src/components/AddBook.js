import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

class AddBook extends Component {
    // TODO: fix required field. Problem: if use submit, page will refresh due to boostrap. But if dont use, required doesn't work
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

    addBook = (event) => {
        event.preventDefault();

        console.log('trigger')
        const { title } = this.state;

        if (title.length === 0) {
            alert('title cannot be empty!')
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
                    console.log('hello')
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
                        <label className="sr-only">Title</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Title" required onChange={this.onChange} />
                        <Button type="button" className="btn btn-primary" onClick={this.addBook}>Submit</Button>
                    </Form>
                    <span>{this.state.added ? `Added: ${this.state.title}` : "No books added!"}</span>
                </Card.Body>
            </Card >
        );
    }
}

export default AddBook;