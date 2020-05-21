const express =require('express');
const userCtrl =require('../controllers/userController');
const taskCtrl=require('../controllers/taskController')
const authCtrl =require('../controllers/authController');
const router = express.Router()

router.route('/api/tasks/by/:userId')
  .get(authCtrl.requireSignin,taskCtrl.list)
  .post(authCtrl.requireSignin,taskCtrl.create) 

router.route('/api/tasks/by/labels/:userId/')
  .get(authCtrl.requireSignin,taskCtrl.taskByLabels)

router.route('/api/tasks/by/priority/:userId/')
  .get(authCtrl.requireSignin,taskCtrl.taskByPriority)

router.route('/api/tasks/by/dueDate/:userId/')
  .get(authCtrl.requireSignin,taskCtrl.taskByDueDate)
  
router.route('/api/tasks/by/status/:userId/')
 .get(authCtrl.requireSignin,taskCtrl.taskByStatus)

router.route('/api/tasks/:userId/:taskId')
  .get(authCtrl.requireSignin,taskCtrl.read)
  .put(authCtrl.requireSignin,taskCtrl.update)
  .delete(authCtrl.requireSignin,taskCtrl.remove)

router.param('taskId', taskCtrl.taskByID)
router.param('userId', userCtrl.userByID)

module.exports= router
