const postCtrl = require('../controllers/posts')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const express = require("express")
const router = express.Router();

router.get('/', postCtrl.posts)
router.get('/:author/', postCtrl.authorPosts)
router.get('/:id', postCtrl.post)
router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.updatepost)
router.delete('/:id', auth, postCtrl.deletepost)
router.put('/', auth, postCtrl.postReviews)

module.exports = router