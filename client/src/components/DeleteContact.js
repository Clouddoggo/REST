import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class DeleteContact extends Component {
    constructor(props) {
        super();
        this.state = {
            contacts: []
        }
    }

    deleteContact = (e, id) => {
        const url = `/contacts/${id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    // getContacts();
                    return response.json();
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Container className="shadow p-4 m-5">
                <ul>
                    {
                        this.state.contacts.map((contact, _) => {
                            return <li>
                                contact
                            <Button className="btn btn-danger" onClick={(e) => this.deleteContact(e, contact.id)}>
                                    Delete
            </Button>
                            </li>
                        })
                    }
                </ul>

            </Container>
        );
    }
}

export default DeleteContact;