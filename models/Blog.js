const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String, 
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Blog", blogSchema);