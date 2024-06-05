const  Router  = require('express'); 
const {read,create,readID,creatComments,readComments, update}=require('../controllers/nurseController')
const app = Router(); 


app.get('/nurses', read)
app.post('/createNurse', create)
app.put('/nurses/:nurseId', update)

module.exports = app;