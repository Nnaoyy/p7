const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const likeCtrl = require('../controllers/like');

router.post('/', auth, likeCtrl.like);
router.get('/:id', auth, likeCtrl.isLike)
router.get('/dislike/:id', auth, likeCtrl.isDislike)


module.exports = router;