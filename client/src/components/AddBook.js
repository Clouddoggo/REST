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

    onSubmit = (event) => {
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
                        <Button type="submit" className="btn btn-primary" onSubmit={(e) => { e.preventDefault(); this.onSubmit(e) }}>Submit</Button>
                    </Form>
                    <span>{this.state.added ? `Added: ${this.state.title}` : "No books added!"}</span>
                </Card.Body>
            </Card >
        );
    }
}

export default AddBook;