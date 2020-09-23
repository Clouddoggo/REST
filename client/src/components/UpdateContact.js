import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap'

class UpdateContact extends Component {
    constructor(props) {
        super();
        this.state = {
            name: "",
            phone: ""
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const url = "/contacts";
        const { name, phone } = this.state;

        if (name.length === 0 || phone.length === 0)
            return;

        const body = {
            name,
            phone,
        };

        fetch(url, {
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
            <Card className="container shadow p-4 m-5">
                <Card.Body>
                    <Card.Title>Update contact</Card.Title>
                    <Form className="form-inline">
                        <div class="input-group mb-2 mr-sm-2">
                            <input type="text" className="form-control" placeholder="Id" />
                        </div>
                        <label class="sr-only">Name</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Name" />
                        <label class="sr-only">number</label>
                        <div class="input-group mb-2 mr-sm-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">#</div>
                            </div>
                            <input type="text" className="form-control" placeholder="Phone number" />
                        </div>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default UpdateContact;