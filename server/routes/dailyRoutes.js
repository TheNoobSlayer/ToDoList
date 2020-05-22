const express =require('express');
const userCtrl =require('../controllers/userController');
const dailyCtrl=require('../controllers/dailyController')
const authCtrl =require('../controllers/authController');
const router = express.Router()

router.route('/api/dailies/by/:userId')
  .get(authCtrl.requireSignin,dailyCtrl.list)
  .post(authCtrl.requireSignin,dailyCtrl.create) 

router.route('/api/dailies/by/labels/:userId/')
  .get(authCtrl.requireSignin,dailyCtrl.dailyByLabels)

router.route('/api/dailies/by/priority/:userId/')
  .get(authCtrl.requireSignin,dailyCtrl.dailyByPriority)

router.route('/api/dailies/by/dueDate/:userId/')
  .get(authCtrl.requireSignin,dailyCtrl.dailyByDueDate)
  
router.route('/api/dailies/by/status/:userId/')
 .get(authCtrl.requireSignin,dailyCtrl.dailyByStatus)

router.route('/api/dailies/:userId/:dailyId')
  .get(authCtrl.requireSignin,dailyCtrl.read)
  .put(authCtrl.requireSignin,dailyCtrl.update)
  .delete(authCtrl.requireSignin,dailyCtrl.remove)

router.param('dailyId', dailyCtrl.dailyByID)
router.param('userId', userCtrl.userByID)

module.exports= router
