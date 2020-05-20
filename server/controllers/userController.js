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

  const addTask = (req, res) => {
    const task1=new Task(req.body);
    req.profile.task.push(task1);
    const user=req.profile;
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
   }) 
  };
  const removeTask=(req,res)=>{
    console.log("Inside remove task");
    const userId={_id:"5ec2e2c567ea2c3b0466640e"};
    const taskId='5ec4d252cf84e14084ab395f';
    User.updateOne(
      {_id:req.profile._id},
      { $pull: { task: {_id:taskId} } }).exec(
      (err, result) => {
        if (err) {
          console.log(err);
          console.log("Inside call back");
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
        
      }
    );
   console.log(user);
  }

  module.exports = {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    addTask,
    removeTask
  };
  