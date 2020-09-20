Contact = require('../model/contactModel');

// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.send({
                message: 'Erroring loading contacts'
            });
        }
        res.status(200).json({
            status: "success",
            message: contacts.length === 0 ? "No contacts saved" : "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.save(function (err) {
        if (err) {
            res.send({
                message: 'Error creating contact'
            });
        }
        res.status(200).json({
            message: 'New contact created!',
            data: contact
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.send({
                message: 'Error loading contact details'
            });
        }
        res.status(200).json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id)
        .then((contact) => {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.email = req.body.email ? req.body.email : contact.email;
            contact.phone = req.body.phone ? req.body.phone : contact.phone;
            contact.save()
        })
        .then(() => res.status(200).json({
            message: 'Contact updated successfully',
            data: contact
        }))
        .catch((err) => {
            res.json({
                message: 'Error deleting contact',
                error: err
            });
        });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.deleteOne(req.params.contact_id)
        .then((contact) => {
            if (!contact) {
                return res.status(404).send({
                    message: `Contact with id ${req.params.contact_id} not found`
                });
            }
            res.status(200).json({
                status: "success",
                message: 'Contact deleted successfully'
            })
        })
        .catch((error) => {
            return res.send({
                message: 'Error deleting contact'
            });
        })

};