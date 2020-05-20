const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: 'mongodb+srv://aditya:aditya@todo-nzzfm.mongodb.net/test?retryWrites=true&w=majority'
  }
  
  module.exports= config