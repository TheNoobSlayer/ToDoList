const mongoose =require('mongoose');
//console.log("Bo inside taskModel");
const RewardSchema = new mongoose.Schema({
  rewardName: {
    type: String,
    trim: true,
    required: 'Reward name is required'
  },
  description: {
    type: String,
    trim: true
  },
  labels: {
    type: String,
    enum: ['Comfort','Rest','Entertainment','Eat a treat','Play','Skip a Daily','Time','Others']
  },
  status:{
    type: String,
    default: 'New',
    enum: ['New','In Progress','Completed']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  price:{
      type:Number,
      default:10
  },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

//const Task=mongoose.model('Task', TaskSchema);
//module.exports=Task;
//module.exports=TaskSchema;
module.exports=mongoose.model('Reward', RewardSchema);