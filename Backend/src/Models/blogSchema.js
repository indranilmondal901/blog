const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: [true, 'Author is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
