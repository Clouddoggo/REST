Book = require('../model/bookModel');

// Handle index actions
exports.getBooks = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.status(200).json({
            status: "success",
            message: books.length === 0 ? "No saved" : "Books retrieved successfully",
            data: books
        });
    });
};

// Handle create book actions
exports.createBook = function (req, res) {
    var book = new Book();
    book.name = req.body.name ? req.body.name : book.name;
    book.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.status(200).json({
            message: 'New book created succesfully',
            data: book
        });
    });
};

// Handle view book info
exports.viewBook = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            res.send(err);
        }
        res.status(200).json({
            message: 'Book details loading..',
            data: book
        });
    });
};

// Handle update book info
exports.updateBook = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err)
            res.send(err);
        book.name = req.body.name ? req.body.name : book.name;
        book.save(function (err) {
            if (err) {
                res.json(err);
            }
            res.status(200).json({
                message: 'Book updated succesfully',
                data: book
            });
        });
    });
};

// Handle delete book
exports.deleteBook = function (req, res) {
    Book.deleteOne({
        _id: req.params.book_id
    }, function (err, book) {
        if (err) {
            res.json({
                message: 'Error deleting book',
            });
        }
        res.status(200).json({
            status: "success",
            message: 'Book deleted succesfully'
        });
    });
};