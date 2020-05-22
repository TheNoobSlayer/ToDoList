const User = require("../models/userModel");
const _ = require("lodash");
const errorHandler = require("../helpers/dbErrorHandler");
const Task=require("../models/tasksModel");
const TaskSchema=require("../models/tasksModel");

const create = (req, res, next) => {
    const user = new User(req.body)
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.status(200).json({
        message: "Successfully signed up!"
      })
    })
  }
  const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user)
        return res.status('400').json({
          error: "User not found"
        })
      req.profile = user
      next()
    })
  }
  
  const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
  }
  
  const list = (req, res) => {
    User.find((err, users) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(users)
    }).select('name email updated created')
  }
  
  const update = (req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  }
  
  const remove = (req, res, next) => {
    let user = req.profile
    user.remove((err, deletedUser) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      deletedUser.hashed_password = undefined
      deletedUser.salt = undefined
      res.json(deletedUser)
    })
  }  

  const decreaseCoins = (req, res, next) => {
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

  const increaseCoins=(req,res,next)=>{
    console.log(req.profile);
    console.log(req.task);
    if(req.task.difficulty==='Trivial'){
      User.findByIdAndUpdate(req.profile._id, {$inc: {"coins": 2}})
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        next()
      })
    }
    else if(req.task.difficulty==='Easy'){
      User.findByIdAndUpdate(req.profile._id, {$inc: {"coins": 5}})
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        next()
      })
    }
    else if(req.task.difficulty==='Medium'){
      User.findByIdAndUpdate(req.profile._id, {$inc: {"coins": 7}})
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        next()
      })
    }
    else if(req.task.difficulty==='Hard'){
      User.findByIdAndUpdate(req.profile._id, {$inc: {"coins": 10}})
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        next()
      })
    } 
  }

  
  

  

  module.exports = {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    increaseCoins,
    decreaseCoins
  };
  