const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id',auth, userCtrl.getOneUser);
router.put('/:id',auth, multer, userCtrl.userUpdate);
router.delete('/:id',auth, userCtrl.deleteUser);
router.get('/profil', auth, userCtrl.findUser);

module.exports = router;