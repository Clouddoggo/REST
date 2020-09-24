import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

class AddBook extends Component {
    constructor(props) {
        super();
        this.state = {
            title: ""
        };
    }

    onChange = (event) => {
        this.setState({ title: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { title } = this.state;

        if (title.length === 0)
            return;

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
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default AddBook;