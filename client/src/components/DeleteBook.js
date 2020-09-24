import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class DeleteBook extends Component {
    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    deleteBook = (e, id) => {
        const url = `/books/${id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    // getBooks();
                    return response.json();
                }
                throw new Error(`Network response error: ${response.id}, ${response.message}`);
            })
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <Container className="shadow p-4 mt-5">
                <ul>
                    {
                        this.state.books.map((book, _) => {
                            return <li>
                                book
                            <Button className="btn btn-danger" onClick={(e) => this.deleteBook(e, book.id)}>
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

export default DeleteBook;