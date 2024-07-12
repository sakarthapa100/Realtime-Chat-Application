const express = require('express');
const { registerUser , loginUser , allUsers} = require('../controllers/userController');

const router = express.Router();

router.route('/').post(registerUser).get(allUsers)
router.post('/login', loginUser);

module.exports = router;
