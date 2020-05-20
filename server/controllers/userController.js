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
    const taskName=req.body.taskName;
    User.updateOne(
      {_id:req.profile._id},
      { $pull: { task: {taskName:taskName} } }).exec(
      (err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
        console.log(result);
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
        
      }
    );
  }

  const listByLabel=(req,res)=>{
    console.log(req.body.taskName);
    console.log(req.body.labels);
    console.log(req.profile.task.taskName)
    User.findOne({'task.taskName':"sleep",_id:req.profile._id,}).exec((err, tasks) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      console.log(tasks);
      res.json(tasks)
    })
  }

  module.exports = {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    addTask,
    removeTask,
    listByLabel
  };
  