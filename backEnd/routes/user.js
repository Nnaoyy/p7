const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.userFile);

module.exports = router;