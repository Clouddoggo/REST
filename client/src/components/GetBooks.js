import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class GetBooks extends Component {
    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    getBooks = async (event) => {
        event.preventDefault();
        fetch(`/books`, {
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
            .then(response => this.setState({ books: response.data }))
            .catch(error => console.log(error.message));

    }

    render() {
        return (
            <Card className="container shadow p-4 mt-5">
                <Card.Body>
                    <Card.Title>Get all books</Card.Title>
                    <Button className="btn btn-info float-left m-2" onClick={(e) => this.getBooks(e)}>Get all</Button>
                    <ul>
                        {
                            this.state.books.map((book) => {
                                return <li key={book._id}>Book Id: {book._id}, Title: {book.title}</li>
                            })
                        }
                    </ul>
                </Card.Body>
            </Card>
        );
    }
}

export default GetBooks;