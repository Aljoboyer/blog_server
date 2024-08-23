const mongoose = require("mongoose");

const Blog = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    writtenBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogUser'
    },
    blogImg: {
        type: mongoose.Mixed,
        required: false
    }
},{
    timestamps: true
});

module.exports  = mongoose.model("BlogUser", Blog);
