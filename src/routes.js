const { Router } = require('express');
const { index } = require('./controllers/UserController');
const UserController = require('./controllers/UserController');
const SearchController = require('./controllers/SearchController');
const MathController = require('./controllers/MathController');

//______________________________\\
//get       : get data          \\
//post      : create new data   \\
//put       : update data       \\
//delete    : delete data       \\
//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨\\



const routes = Router();

//users
routes.get('/users', UserController.index);
routes.post('/user', UserController.store);
routes.put('/user', UserController.update);
routes.put('/userItem', UserController.updateDayListPutItem);
routes.put('/userDeleteItem', UserController.updateDayListDeleteItem);
routes.put('/userGoal', UserController.updateGoal);
routes.put('/LogRegression', MathController.LogRegression)

//search
routes.get('/search', SearchController.index);



module.exports = routes;