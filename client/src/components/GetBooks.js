import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetBooks extends Component {
    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    getBooks = (event) => {
        event.preventDefault();
        fetch(`/books`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    const { message, data } = response.json();
                    this.setState({ books: data });
                    return message;
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .catch(error => console.log(error.message));

    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Get all books</Card.Title>
                    <Form>
                        <Button className="btn btn-info float-left m-2" onSubmit={this.getBooks}>Get all</Button>
                    </Form>

                    <ul>
                        {
                            this.state.books.map((book) => {
                                console.log('hi')
                                return <li>Id: {book._id}, Title: {book.title}</li>
                            })
                        }
                    </ul>
                </Card.Body>
            </Card>
        );
    }
}

export default GetBooks;