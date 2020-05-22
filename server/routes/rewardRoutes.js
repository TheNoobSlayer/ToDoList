const express =require('express');
const userCtrl =require('../controllers/userController');
const rewardCtrl=require('../controllers/rewardController')
const authCtrl =require('../controllers/authController');
const router = express.Router()

router.route('/api/rewards/by/:userId')
  .get(authCtrl.requireSignin,rewardCtrl.list)
  .post(authCtrl.requireSignin,rewardCtrl.create) 

router.route('/api/rewards/by/labels/:userId/')
  .get(authCtrl.requireSignin,rewardCtrl.rewardByLabels)
  
router.route('/api/rewards/by/status/:userId/')
 .get(authCtrl.requireSignin,rewardCtrl.rewardByStatus)

router.route('/api/rewards/:userId/:rewardId')
  .get(authCtrl.requireSignin,rewardCtrl.read)
  .put(authCtrl.requireSignin,rewardCtrl.update)
  .delete(authCtrl.requireSignin,userCtrl.decreaseCoins,rewardCtrl.remove)

router.param('rewardId', rewardCtrl.rewardByID)
router.param('userId', userCtrl.userByID)

module.exports= router
