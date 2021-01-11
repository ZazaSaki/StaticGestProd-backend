const { get } = require('mongoose');
const { update } = require('../models/User');
const User  = require('../models/User');

//index  : List users      ..done
//store  : save new user   ..done
//show   : show sepcific user
//update : exinsting user ..done
//destroy: delete an user




module.exports = {
    
    async updateDayListDeleteItem(req,res){
        console.log("DeleteItem");
        
        console.log(req.query);

        //request
        const {email, id} = req.query;
        const {day: dayItem} = req.body;
        
        //data base
        //const {name, emailU, passU} = await User.findOne({email});
        let {dayList} = await User.findOne({email});
        
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
        const {email, id} = req.query;
        const {goal} = req.body;
        
        //data base
        const {name, emailU, passU} = await User.findOne({email});
        let {dayList} = await User.findOne({email});

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
        const {email, id} = req.query;
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


    async update(req,res){
        //request
        const {email, id} = req.query;
        const {dayListItem} = req.body;
        
        //data base
        const {name, emailU, passU} = await User.findOne({email});
        let {dayList} = await User.findOne({email});

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
        return await User.find()
                        .then(l => res.json);
    },

    async store(req, res) {
        //request
        const {name, pass, email, dayList} = req.body;
        
        //checking existing data
        let user = await User.findOne({email});
        user = user ? user : await User.findOne({name});

        if (!user) {
            
            //adding user
            user = await User.create({
                name,
                pass,
                email,
                dayList,
            });
        }

        
        
        return res.json(user);
    }
}