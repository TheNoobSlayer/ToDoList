const express =require('express');
const userCtrl =require('../controllers/userController');
const taskCtrl=require('../controllers/taskController');
const authCtrl =require('../controllers/authController');
const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)


  
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin,userCtrl.read)
  .put(authCtrl.requireSignin,userCtrl.update)
  .delete(authCtrl.requireSignin,userCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports= router
