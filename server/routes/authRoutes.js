const express =require('express');
const authCtrl= require('../controllers/authController');
const router = express.Router()

router.route('/auth/user/signin')
  .post(authCtrl.signin)
router.route('/auth/user/signout')
  .get(authCtrl.signout)


module.exports= router