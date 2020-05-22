const User = require("../models/userModel");
const _ = require("lodash");
const errorHandler = require("../helpers/dbErrorHandler");
const Daily=require("../models/dailyModel");

const create = (req, res, next) => {
    const daily = new Daily(req.body)
    daily.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  }
  
  const dailyByID = (req, res, next, id) => {
    Daily.findById(id).populate('user', '_id name').exec((err, daily) => {
      if (err || !daily)
        return res.status('400').json({
          error: "Product not found"
        })
      req.daily = daily
      next()
    })
  }
  
  
  const read = (req, res) => {
    return res.json(req.daily)
  }
  
  const update = (req, res, next) => {
    console.log(req.body);
    console.log(req.task);
    let daily = req.daily
    daily = _.extend(daily, req.body)
    daily.updated = Date.now()
    daily.save((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      daily.hashed_password = undefined
      daily.salt = undefined
      res.json(daily)
    })
  }
  
  const remove = (req, res, next) => {
    let daily = req.daily
    daily.remove((err, deletedDaily) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedDaily)
    })
  }
  
  const listByUser = (req, res) => {
    Daily.find({user: req.profile._id}, (err, dailies) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(dailies)
    }).populate('user', '_id name')
  }
  
  const dailyByDueDate = (req, res) => {
    Daily.find({}).sort({dueDate:+1}).limit(5).populate('user', '_id name').exec((err, dailies) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(dailies)
    })
  }
  
  const dailyByLabels = (req, res) => {
    Daily.find({labels: req.body.labels}).limit(5).populate('user', '_id name').exec((err, dailies) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(dailies)
    })
  }

  const dailyByPriority = (req, res) => {
    Daily.find({priority: req.body.priority}).limit(5).populate('user', '_id name').exec((err, dailies) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(dailies)
    })
  }

  const dailyByStatus = (req, res) => {
    Daily.find({status: req.body.status}).limit(5).populate('user', '_id name').exec((err, dailies) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(dailies)
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
    Daily.find(query, (err, dailies) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(dailies)
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
    dailyByID,
    read,
    list,
    remove,
    update,
    listByUser,
    dailyByLabels,
    dailyByPriority,
    dailyByStatus,
    dailyByDueDate

    
  };