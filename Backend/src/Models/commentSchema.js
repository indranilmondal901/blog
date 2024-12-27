const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog', // Reference to the Blog model
        required: [true, 'Blog is required']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: [true, 'Author is required']
    },
    content: {
        type: String,
        required: [true, 'Comment content is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
