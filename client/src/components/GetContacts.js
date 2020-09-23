import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetContact extends Component {
    constructor(props) {
        super();
        this.state = {
            contacts: [],
            id: '',
            contact: null
        }
    }

    getContactById = () => {
        const url = `/contacts/${this.state.id}`;
        fetch(url, {
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
            .then(response => this.setState({ contact: response }))
            .catch(error => console.log(error.message));
    }

    getContacts = () => {
        const url = `/contacts`;
        fetch(url, {
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
            .then(response => this.setState({ contacts: response }))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Card className="container shadow p-4 m-5">
                <Card.Body>
                    <Card.Title>Get contact(s)</Card.Title>
                    <Form className="form-inline">
                        <label className="sr-only">Id</label>
                        <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Id" />
                        <Button className="btn btn-info" onClick={this.getContacts}>Get by Id</Button>
                        <span className="mr-5 ml-5">OR</span>
                        <Button className="btn btn-info float-left m-2" onClick={this.getContactById}>Get all</Button>
                    </Form>
                    <ul>
                        {
                            this.state.contacts.map((contact, _) => {
                                return <li>
                                    contact
                                </li>
                            })
                        }
                    </ul>
                </Card.Body>
            </Card>
        );
    }
}

export default GetContact;