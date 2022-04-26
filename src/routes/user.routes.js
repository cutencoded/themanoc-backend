const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/api/students')
    .get(userCtrl.list)
    .post(userCtrl.create)
    .put(userCtrl.update)
    .delete(userCtrl.remove);  

module.exports = router;
