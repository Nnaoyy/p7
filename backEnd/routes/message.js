const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const messageCtrl = require('../controllers/message');

router.post('/', auth, messageCtrl.createMessage);
router.get('/:id', auth, messageCtrl.getAllMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);


module.exports = router;