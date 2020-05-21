const mongoose =require('mongoose');
console.log("Bo inside taskModel");
const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    trim: true,
    required: 'Task name is required'
  },
  description: {
    type: String,
    trim: true
  },
  labels: {
    type: String,
    enum: ['Work','School','Personal','Exercise','Health & Fitness','Chores','Creativity','Self Development']
  },
  priority: {type: String,
    default: 'Medium',
    enum: ['Low' , 'Medium', 'High']
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
  dueDate:{
      type: Date,
  },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

//const Task=mongoose.model('Task', TaskSchema);
//module.exports=Task;
//module.exports=TaskSchema;
module.exports=mongoose.model('Task', TaskSchema);