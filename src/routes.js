const { Router } = require('express');
const { index } = require('./controllers/UserController');
const UserController = require('./controllers/UserController');
const SearchController = require('./controllers/SearchController');
const MathController = require('./controllers/MathController');
const passport = require('passport');

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
routes.put('/user', UserController.addDayList);
routes.get('/user', UserController.user);

//log : in/out
routes.post('/register', UserController.store);
routes.get('/logged', UserController.logged);

routes.post('/login', UserController.checkNot ,(req, res, next)=>{
    
    console.log("log in.............");
    
    console.log(req.isAuthenticated());

    if(req.user){
        res.send("already logged");
        return(req, res, next);
    }
    
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
            if (err) throw err;
            res.send({user,authenticated:true});
            
            console.log(req.cookies);
            
        });
        }
    })(req, res, next);
});

routes.get('/logout', UserController.logout);


//app routes
routes.put('/userItem', UserController.updateDayListPutItem);
routes.put('/userDeleteItem', UserController.updateDayListDeleteItem);
routes.put('/userGoal', UserController.updateGoal);
routes.put('/LogRegression', MathController.LogRegression)

//search
routes.get('/search', SearchController.searchByEmail);


module.exports = routes;