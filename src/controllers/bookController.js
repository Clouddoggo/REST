Book = require('../model/bookModel');

// Handle index actions
exports.getBooks = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            return res.status(500).json({
                status: "Error",
                message: "Cannot get books",
            });
        }
        return res.status(200).json({
            status: "success",
            message: books.length === 0 ? "No books saved" : "Books retrieved successfully",
            data: books
        });
    });
};

// Handle create book actions
exports.createBook = function (req, res) {
    var book = new Book();
    if (!req.body.title || req.body.title.trim().length === 0) {
        return res.status(422).json({
            status: "Unproccessable",
            message: "Invalid title entered."
        });
    }
    book.title = req.body.title.trim();
    book.save(function (err) {
        if (err) {
            return res.json({
                status: "Error",
                message: "Cannot create book"
            });
        }
        return res.status(200).json({
            message: 'New book created succesfully',
            data: book
        });
    });
};

// Handle view book info
exports.viewBook = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            return res.status(500).json({
                status: "Error",
                message: "Cannot view book"
            });
        }
        return res.status(200).json({
            message: 'Book details loading..',
            data: book
        });
    });
};

// Handle update book info
exports.updateBook = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            return res.status(500).json({
                status: "Error",
                message: "Cannot update book"
            })
        } else if (!req.body.title || req.body.title.trim().length === 0) {
            return res.status(422).json({
                status: "Unproccessable",
                message: "Invalid title entered"
            })
        }
        book.title = req.body.title.trim();
        book.save(function (err) {
            if (err) {
                return res.json(err);
            }
            return res.status(200).json({
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
    }, function (err, count) {
        if (err) {
            return res.status(500).json({
                message: 'Error deleting book',
            });
        }
        return res.status(200).json({
            status: "success",
            message: 'Book deleted succesfully'
        });
    });
};