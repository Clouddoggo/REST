import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class GetBooks extends Component {
    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    getBooks = async () => {
        try {
            const result = await fetch(`/books`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const { message, data } = await result.json();
            this.setState({ books: data })
            console.log(`data: ${data}, message: ${message}`);
        } catch (e) {
            console.error(e.message);
        }

    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Get all books</Card.Title>
                    <Form>
                        <Button className="btn btn-info float-left m-2" onClick={this.getBooks}>Get all</Button>
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