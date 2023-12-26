
const {addNewContact, getContact, getContactById, updateContact, deleteContact} = require('../controllers/crmControllers');

const routes = (app) =>{

    app.route("/contact")
    .get((req, res, next)=> {

        // middleware setting
        console.log(`Request de: ${req.originalUrl}`);
        console.log(`La Methode: ${req.method}`);
        next();

    }, getContact)


    // .post((req, res)=> res.send("La demande POST avec succé"))
    .post(addNewContact);

    app.route("/contact/:contactId")
    // getting the contact with id
    .get(getContactById)
    // updating contact with id
    .put(updateContact)

    // deleting contact with id
    .delete(deleteContact)
}

module.exports = routes;