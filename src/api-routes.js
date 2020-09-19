// Initialize express router
let router = require('express').Router();

// Set default response
router.get('/', function (req, res) {
    res.send('Welcome to RESTful API for CS3219 Task B!');
});

// Import contact controller
let contactController = require('./controllers/contactController');

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;