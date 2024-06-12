const  Router  = require('express'); 
const {read,create,remove, update}=require('../controllers/doctorController')
const app = Router(); 


app.get('/doctors', read)
app.post('/createDoctor', create)
app.put('/doctor/:doctorId', update)
app.delete('/doctor/:doctorId', remove)

module.exports = app;