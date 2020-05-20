const express =require('express');
const userCtrl =require('../controllers/userController');
//const authCtrl =require('../controllers/authController');
const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)


router.route('/api/users/addTask/:userId')
  .put(userCtrl.addTask)
    


router.route('/api/users/removeTask/:userId')
  .put(userCtrl.removeTask) 
  
  
router.route('/api/users/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports= router
