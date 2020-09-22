Contact = require('../model/contactModel');

// Handle index actions
exports.getContacts = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
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
exports.createContact = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.status(200).json({
            message: 'New contact created succesfully',
            data: contact
        });
    });
};

// Handle view contact info
exports.viewContact = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.status(200).json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.updateContact = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.email = req.body.email ? req.body.email : contact.email;
        contact.phone = req.body.phone ? req.body.phone : contact.phone;
        contact.save(function (err) {
            if (err) {
                res.json(err);
            }
            res.status(200).json({
                message: 'Contact updated succesfully',
                data: contact
            });
        });
    });
};

// Handle delete contact
exports.deleteContact = function (req, res) {
    Contact.deleteOne({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err) {
            res.json({
                message: 'Error deleting contact',
            });
        }
        res.status(200).json({
            status: "success",
            message: 'Contact deleted succesfully'
        });
    });
};