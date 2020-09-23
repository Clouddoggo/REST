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
            <div className="align-item-center">
                <Card className="contact-card">
                    <Form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="string" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Name of contact:</label>
                            <div className="col-sm-10">
                                <input type="string" className="form-control" placeholder="John Doe" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Phone number:</label>
                            <div className="col-sm-10">
                                <input type="string" className="form-control" placeholder="91234567" />
                            </div>
                        </div>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default UpdateContact;