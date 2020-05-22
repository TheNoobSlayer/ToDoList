const User = require("../models/userModel");
const _ = require("lodash");
const errorHandler = require("../helpers/dbErrorHandler");
const Reward=require("../models/rewardModel");
const TaskSchema=require("../models/tasksModel");

const create = (req, res, next) => {
    const reward = new Reward(req.body)
    reward.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  }
  
  const rewardByID = (req, res, next, id) => {
    Reward.findById(id).populate('user', '_id name').exec((err, reward) => {
      if (err || !reward)
        return res.status('400').json({
          error: "Reward not found"
        })
      req.reward = reward
      next()
    })
  }
  
  
  const read = (req, res) => {
    //console.log(req);
    //req.product.image = undefined
    return res.json(req.reward)
  }
  
  const update = (req, res, next) => {
    console.log(req.body);
    console.log(req.reward);
    let reward = req.reward
    reward = _.extend(reward, req.body)
    reward.updated = Date.now()
    reward.save((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      reward.hashed_password = undefined
      reward.salt = undefined
      res.json(reward)
    })
  }
  
  const remove = (req, res, next) => {
    let reward = req.reward
    reward.remove((err, deletedReward) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedReward)
    })
  }
  
  const rewardsByUser = (req, res) => {
    Reward.find({user: req.profile._id}, (err, rewards) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(rewards)
    }).populate('user', '_id name')
  }
  
  
  
  const rewardByLabels = (req, res) => {
    console.log("Inside listByLabels")
    console.log(req.task);
    console.log(req.body.labels);
    Reward.find({labels: req.body.labels}).limit(5).populate('user', '_id name').exec((err, rewards) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(rewards)
    })
  }

  const rewardByStatus = (req, res) => {
    //console.log("Inside listByLabels")
    //console.log(req.task);
    //console.log(req.body.labels);
    Reward.find({status: req.body.status}).limit(5).populate('user', '_id name').exec((err, rewards) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(rewards)
    })
  }
  
  const listCategories = (req, res) => {
    Product.distinct('category',{},(err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(products)
    })
  }
  
  const list = (req, res) => {
    const query = {}
    if(req.query.search)
      query.name = {'$regex': req.query.search, '$options': "i"}
    if(req.query.category && req.query.category != 'All')
      query.category =  req.query.category
    Reward.find(query, (err, rewards) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(rewards)
    }).populate('user', '_id name')
  }
  
  const decreasePrice = (req, res, next) => {
    console.log(req.profile);
    console.log(req.reward);
    let decreaseBy=0;
    if(req.reward.labels==='Comfort'){
        decreaseBy=25;
    }
    else if(req.reward.labels==='Rest'){
        decreaseBy=20;
    }
    else if(req.reward.labels==='Entertainment'){
        decreaseBy=30;
    }
    else if(req.reward.labels==='Eat a treat'){
        decreaseBy=30;
    }
    else if(req.reward.labels==='Play'){
        decreaseBy=35;
    }
    else if(req.reward.labels==='Skip a Daily'){
        decreaseBy=35;
    }
    else if(req.reward.labels==='Time'){
        decreaseBy=35;
    }
    else if(req.reward.labels==='Others'){
        decreaseBy=35;
    }    
    User.findByIdAndUpdate(req.profile._id, {$inc: {"coins": -decreaseBy}})
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      next()
    })
  }
  
  const increaseQuantity = (req, res, next) => {
    Product.findByIdAndUpdate(req.product._id, {$inc: {"quantity": req.body.quantity}}, {new: true})
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        next()
      })
  }

  

  module.exports = {
    create,
    rewardByID,
    read,
    list,
    remove,
    update,
    rewardsByUser,
    rewardByLabels,
    rewardByStatus

    
  };