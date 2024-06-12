const  Router  = require('express'); 
const {read,create,remove, update}=require('../controllers/nurseController')
const app = Router(); 


app.get('/nurses', read)
app.post('/createNurse', create)
app.put('/nurse/:nurseId', update)
app.delete('/nurse/:nurseId', remove)

module.exports = app;