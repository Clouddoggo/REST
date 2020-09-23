import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetContact extends Component {
    constructor(props) {
        super();
        this.state = {
            contacts: [],
            id: ''
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
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div>
                <Card className="contact-card">
                    <Form>
                        <Button className="btn btn-info" onClick={this.getContactById}>Get all</Button>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="string" className="form-control" />
                            </div>
                        </div>
                        <Button className="btn btn-info" onClick={this.getContacts}>Get by Id</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default GetContact;