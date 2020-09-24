// Initialize express router
let router = require('express').Router();

// Set default response
router.get('/', function (req, res) {
    res.send('Welcome to RESTful API for CS3219 Task B!');
});

// Import book controller
let bookController = require('./controllers/bookController');

// Book routes
router.route('/books')
    .get(bookController.getBooks)
    .post(bookController.createBook);
router.route('/books/:book_id')
    .get(bookController.viewBook)
    .patch(bookController.updateBook)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);

// Export API routes
module.exports = router;