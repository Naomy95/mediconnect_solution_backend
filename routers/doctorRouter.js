const  Router  = require('express'); 
const {read,create,readID,creatComments,readComments, update}=require('../controllers/doctorController')
const app = Router(); 


app.get('/doctors', read)
app.post('/createDoctor', create)
app.put('/doctor/:doctorId', update)

module.exports = app;