const  Router  = require('express'); 
const {login}=require('../controllers/adminLoginController')
const app = Router(); 



app.post('/login', login)


  
module.exports = app;