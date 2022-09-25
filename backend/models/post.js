const mongoose = require('mongoose')
const postShema = mongoose.Schema({
    author: { type: String, required: true },
    userId: { type: String, required: true },
    postMsg: { type: String, required: true },
    imgUrl: { type: String },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    userLiked: { type: Array, required: true },
    userDisliked: { type: Array, required: true },
});
module.exports = mongoose.model("Post", postShema);