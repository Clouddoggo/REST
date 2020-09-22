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
    .get(contactController.getContacts)
    .post(contactController.createContact);
router.route('/contacts/:contact_id')
    .get(contactController.viewContact)
    .patch(contactController.updateContact)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);

// Export API routes
module.exports = router;