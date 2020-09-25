const router = require('express').Router();
const bookController = require('./controllers/bookController');

// Book routes
router.route('/')
    .get(bookController.getBooks)
    .post(bookController.createBook);
router.route('/:book_id')
    .get(bookController.viewBook)
    .patch(bookController.updateBook)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);

// Export API routes
module.exports = router;