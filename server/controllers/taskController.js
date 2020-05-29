const User = require("../models/userModel");
const _ = require("lodash");
const errorHandler = require("../helpers/dbErrorHandler");
const Task=require("../models/tasksModel");
const TaskSchema=require("../models/tasksModel");

const create = (req, res, next) => {
  console.log("Inside Task Controller.create");
    const task = new Task(req.body)
    task.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  }
  
  const taskByID = (req, res, next, id) => {
    Task.findById(id).populate('user', '_id name').exec((err, task) => {
      if (err || !task)
        return res.status('400').json({
          error: "Product not found"
        })
      req.task = task
      next()
    })
  }
  
  
  const read = (req, res) => {
    //console.log(req);
    //req.product.image = undefined
    return res.json(req.task)
  }
  
  const update = (req, res, next) => {
    console.log(req.body);
    console.log(req.task);
    let task = req.task
    task = _.extend(task, req.body)
    task.updated = Date.now()
    task.save((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      task.hashed_password = undefined
      task.salt = undefined
      res.json(task)
    })
  }
  
  const remove = (req, res, next) => {
    let task = req.task
    task.remove((err, deletedTask) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedTask)
    })
  }
  
  const listByUser = (req, res) => {
    Task.find({user: req.profile._id}, (err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(tasks)
    }).populate('user', '_id name')
  }
  
  const taskByDueDate = (req, res) => {
    Task.find({}).sort({dueDate:+1}).limit(5).populate('user', '_id name').exec((err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(tasks)
    })
  }
  
  const taskByLabels = (req, res) => {
    console.log("Inside listByLabels")
    console.log(req.task);
    console.log(req.body.labels);
    Task.find({labels: req.body.labels}).limit(5).populate('user', '_id name').exec((err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(tasks)
    })
  }

  const taskByPriority = (req, res) => {
    //console.log("Inside listByLabels")
    console.log("Bo inside taskbyPriority");
    console.log(req);
    console.log(req.body.priority);
    Task.find({priority: req.body.priority}).limit(5).populate('user', '_id name').exec((err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(tasks)
    })
  }

  const taskByStatus = (req, res) => {
    //console.log("Inside listByLabels")
    //console.log(req.task);
    //console.log(req.body.labels);
    Task.find({status: req.body.status}).limit(5).populate('user', '_id name').exec((err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(tasks)
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
    Task.find(query, (err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(tasks)
    }).populate('user', '_id name')
  }
  
  const decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
      return {
          "updateOne": {
              "filter": { "_id": item.product._id } ,
              "update": { "$inc": {"quantity": -item.quantity} }
          }
      }
     })
     Product.bulkWrite(bulkOps, {}, (err, products) => {
       if(err){
         return res.status(400).json({
           error: "Could not update product"
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
    taskByID,
    read,
    list,
    remove,
    update,
    listByUser,
    taskByLabels,
    taskByPriority,
    taskByStatus,
    taskByDueDate

    
  };