const Post = require('../models/Post');
const fs = require('fs');

// get all posts
exports.posts = (req, res, next) => {
    Post.find()
        .then(postsObjects => {
            const posts = postsObjects.reverse();
            res.status(200).json({ posts })
        })
        .catch(error => { res.status(500).json({ error }) })
}

// creation of new post
exports.createPost = (req, res, next) => {
    if (req.file) {
        const postReceived = JSON.parse(req.body.post)
        const post = new Post({
            ...postReceived,
            userId: req.auth.userId,
            imgUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: []
        });
        post.save()
            .then(() => { res.status(201).json({ message: 'post ajouter' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
    else {
        const postReceived = JSON.parse(req.body.post)
        const post = new Post({
            ...postReceived,
            userId: req.auth.userId,
            imgUrl: "",
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: []
        });
        post.save()
            .then(() => { res.status(201).json({ message: 'post ajouter' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

// get one post
exports.post = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(201).json(post))
        .catch(error => { res.status(404).json({ error }) })
}

// get current user posts
exports.authorPosts = (req, res, next) => {
    Post.find({ author: req.params.author })
        .then(posts => (res.status(200).json(posts)))
        .catch(() => res.status(500))
}

// update post function
exports.updatepost = (req, res, next) => {
    if (req.file) {
        const postReceived = JSON.parse(req.body.post)
        Post.updateOne({ _id: req.params.id }, {
            ...postReceived,
            imgUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
    else {
        const postReceived = JSON.parse(req.body.post)
        Post.updateOne({ _id: req.params.id }, {
            ...postReceived
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

// delete post
exports.deletepost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const imgName = post.imgUrl.split('/image/')[1];
            fs.unlink(`image/${imgName}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "poste supprimer" }))
                    .catch(error => res.status(500).json({ error }))
            })
        })
        .catch(error => res.status(500).json({ error }))
}

// like and dislike function
exports.postReviews = (req, res, next) => {
    Post.findOne({ _id: req.body.postId })
        .then(post => {
            const userLiked = post.userLiked;
            const userDisliked = post.userDisliked;
            const checkUserLike = userLiked.find(usrId => req.auth.userId === usrId);
            const checkUserDislike = userDisliked.find(userId => req.auth.userId === userId);

            switch (req.body.like) {
                case 1:
                    try {
                        if (!checkUserLike && !checkUserDislike) {
                            userLiked.push(req.auth.userId);
                            Post.updateOne({ _id: req.body.postId }, {
                                likes: post.likes += 1,
                                userLiked: userLiked
                            })
                                .then(() => res.status(200).json({ message: "post liker" }))
                                .catch(error => { throw error })
                        }
                        else {
                            throw "l'utilisateur a deja liker ou disliker le post"
                        }
                    } catch (error) {
                        res.status(500).json({ error })
                    }

                    break;

                case -1: try {
                    if (!checkUserDislike && !checkUserLike) {
                        userDisliked.push(req.auth.userId);
                        Post.updateOne({ _id: req.body.postId }, {
                            dislikes: post.dislikes += 1,
                            userDisliked: userDisliked
                        })
                            .then(() => res.status(200).json({ message: "post disliker" }))
                            .catch(error => { throw error })
                    }
                    else {
                        throw 'non autoriser'
                    }
                } catch (error) {
                    res.status(500).json({ error })
                }
                    break;

                case 0: try {
                    if (checkUserLike) {
                        const index = userLiked.findIndex(userId => userId === req.auth.userId);
                        userLiked.splice(index, 1)
                        Post.updateOne({ _id: req.body.postId }, {
                            likes: post.likes -= 1,
                            userLiked: userLiked
                        })
                            .then(() => res.status(200).json({ message: 'like annuler' }))
                            .catch(error => { throw error })
                    }
                    else if (checkUserDislike) {
                        const index = userDisliked.findIndex(userId => userId === req.auth.userId);
                        userDisliked.splice(index, 1);
                        Post.updateOne({ _id: req.body.postId }, {
                            dislikes: post.dislikes -= 1,
                            userDisliked: userDisliked
                        })
                            .then(() => res.status(200).json({ message: 'dislike annuler' }))
                            .catch(error => { throw error })
                    }
                } catch (error) {
                    res.status(500).json({ error })
                }
                    break;

                default:
                    break;
            }
        })
        .catch(error => res.status(500).json({ error }))
}