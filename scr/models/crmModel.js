const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName:{
        type: String,
        require: "entrer un prénom"
    },
    lastName:{
        type: String,
        require: "entrer un nom de famile"
    },
    mail:{
        type: String,
    },
    company:{
        type: String,
    },
    phone:{
        type: Number,
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = contactSchema;