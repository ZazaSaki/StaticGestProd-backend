const User  = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { get } = require('mongoose');


//index  : List users      ..done
//store  : save new user   ..done
//show   : show sepcific user
//update : exinsting user ..done
//destroy: delete an user




module.exports = {

    
    async updateDayListDeleteItem(req,res,next){
        console.log("DeleteItem");
        
        console.log(req.query);

        //request
        //const {email, id} = req.query;
        const {id} = req.query;
        const {day: dayItem} = req.body;
        
        const dataUser = await User.findOne({email : req.user.email});

        //data base
        const {name, email, passU} = dataUser;
        console.log({dataUser});

        let {dayList} = dataUser;
        
        console.log({dayList});

        //checking existing data
        const index = dayList.findIndex(e => (e.id == id));

        if(index > -1){
            //extracting list
            let {List} = dayList[index];
            
            //extracting the day
            const IndexOfDay = List.splice(List.findIndex(e => (dayItem==e.day)),1);
            
        }
        
        //updating user
        const user = await User.updateOne({email}, {dayList});

        return res.json(user);

    },
    
    async updateGoal(req,res){
        console.log('Update Goal');

        //request
        //const {email, id} = req.query;
        const dataUser = await User.findOne({email : req.user.email});
        
        const {id} = dataUser;
        const {goal} = req.body;
        
        //data base
        const {name, email, passU} = dataUser;
        let {dayList} = dataUser;

        //checking existing data
        const index = dayList.findIndex(e => (e.id == id));

        if(index > -1){
            dayList[index].goal = goal;
        }else{
            //adding new dayList
            dayList = [...dayList, {
                        List : [],
                        id : id,
                        goal : goal
                    }]
            ;
        }
        
        //updating user
        const user = await User.updateOne({email}, {dayList});

        return res.json(user);
        
    },


    async updateDayListPutItem(req,res){
        console.log("updateItem");
        
        console.log(req.query);

        //request
        const {id} = req.query;
        const {email} = req.user;
        const {day: dayItem, production: productionItem, ignore: ignoreItem} = req.body;
        
        //data base
        const {name, emailU, passU} = await User.findOne({email});
        let {dayList} = await User.findOne({email});

        //checking existing data
        const index = dayList.findIndex(e => (e.id == id));

        if(index > -1){
            //extracting list
            let {List} = dayList[index];
            
            //extracting the day
            const IndexOfDay = List.findIndex(e => (dayItem==e.day));

            //checking existing day
            if (IndexOfDay>-1) {
                //changing day value
                List[IndexOfDay].day = dayItem;
                List[IndexOfDay].production = productionItem;
                List[IndexOfDay].ignore = ignoreItem;

            }else{
                //appending productions
                List = [...List, {day : dayItem, production : productionItem, ignore : ignoreItem}]
                
                //sortting
                List.sort((a,b) => a.day-b.day);

            }
            
            dayList[index] = {
                List,
                id,
            };
            
        }else{
            
            //adding new dayList
            dayList = [...dayList, {
                        List : [{day : dayItem, production : productionItem, ignore : ignoreItem}],
                        id : id,
                    }]
            ;
        }
        
        //updating user
        const user = await User.updateOne({email}, {dayList});

        return res.json(user);


    },


    async addDayList(req,res){
        //request
        //const {email, id} = req.query;
        const {dayListItem} = req.body;
        
        //data base
        const dataUser = await User.findOne({email : req.user.email});
        const {name, email, id} = dataUser;
        let {dayList} = dataUser;

        //checking existing data
        const index = dayList.findIndex(e => (e.id == id));

        if(index > -1){
            dayList[index] = dayListItem;
        }else{
            dayList = [...dayList, dayListItem]
        }
        
        //updating user
        const user = await User.updateOne({email}, {dayList});

        return res.json(user);
    },

    async index(req, res) {
        console.log("innnnnnndeeeeeeeex");
        
        return await User.find()
                        .then(l => res.json);
    },

    async store(req, res) {
        //request
        const {name, id, pass, email, dayList} = req.body;
        const password = await bcrypt.hash(pass, 10);
        //checking existing data
        let user = await User.findOne({email});
        user = user ? user : await User.findOne({id});

        if (!user) {
            
            //adding user
            user = await User.create({
                name,
                id,
                pass:password,
                email,
                dayList,
            });
        }

        
        
        return res.json(user);
    },

    async user(req, res){
        console.log("getting user");
        console.log(req.user)

        const {email} = req.user;
        const user = await User.findOne({email});
        
        const {dayList} = user;
        console.log({dayList});
        res.json(dayList);
    },

    async logged(req, res){
        console.log("logged");
        console.log(req.isAuthenticated());
        console.log(req.user);
        res.json(req.user);
    },

    async login(req, res, next){
        console.log("login");
        if(req.user){
            res.send("already logged");
            return(req, res, next);
        }
        passport.authenticate("local", (err, user, info) => {
            
            if (err) throw err;
            if (!user){
                res.send("No User Exists");
                console.log("here in !user");
            } 
            else {
              req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
              });
            }
          })
          return (req, res, next);
    },

    async logout(req, res){
        req.logout();
        res.json(req.user);
    },

    check(req,res,next) {
        console.log("checking....................");
        if (req.isAuthenticated()) {
            
            redirect(res, "/index");
            return ;
        }
        return next();
    },

    checkNot(req,res,next) {
        console.log("checking....................");
        if (!req.isAuthenticated()) {
            redirect(res, "/login");
            return ;
        }
        return next();
    }
    
}
function redirect(res, redirect){
        res.json({redirect});
    }

async function getUser(req){
    console.log({requser : req.user});
    
    const {email} = req.user;
    const user = await User.findOne({email});
    console.log({user, requser : req.user});
    return user;
}

async function getUserDayList(req){
    console.log({requser : req.user});
    
    const {email} = req.user;
    const user = await User.findOne({email});
    const {daylist} = user;
    console.log({daylist, user, requser : req.user});
    return daylist;
}