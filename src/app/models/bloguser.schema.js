const mongoose = require("mongoose");

const BlogUser = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    phone:  {
        type: String,
        required: false
    },
    email:  {
        type: String,
        required: true
    },
    profileImg: {
        type: mongoose.Mixed,
        required: false
    }
});

module.exports  = mongoose.model("BlogUser", BlogUser);
