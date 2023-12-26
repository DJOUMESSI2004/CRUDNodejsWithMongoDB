const mongoose = require('mongoose');
const contactSchema = require('../models/crmModel');

// Creating a mongoose model using the schema
const Contact = mongoose.model('contacts', contactSchema);

// inserting into the database
const addNewContact = async (req, res) => {
    const newContact = new Contact(req.body);

    try {
        const savedContact = await newContact.save();
        console.log('Contact saved:', savedContact);
        return res.status(201).json(savedContact);
    } catch (error) {
        console.error('Error saving contact:', error);
        return res.status(500).json({ error: error.message });
    }
};


// retrieving data from database
const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// find contact by id
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId, {});

        if (!contact) {
            // If contact with the specified ID is not found
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// create endpoint for updating data

const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findOneAndUpdate(
            { _id: req.params.contactId },
            req.body,
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// deleting data from database
const deleteContact = async (req, res) => {
    try {
        const deleteResult = await Contact.deleteOne({ _id: req.params.contactId });

        if (deleteResult.deletedCount === 0) {
            // No contact was deleted, likely because it wasn't found
            return res.status(404).json({ error: 'Contact not found or already deleted' });
        }

        res.json({ message: 'Successfully deleted contact' });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};



// exporting the different functions
module.exports = {
    addNewContact,
    getContact,
    getContactById,
    updateContact,
    deleteContact,
};
