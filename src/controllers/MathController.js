const User = require('../models/User');
const regression = require('regression');

module.exports = {
    async LogRegression(req, res){
        console.log('regression');
        

        const {list} = req.body;
        console.log(list);
        
        if (list == null) {
            res.json({a:0,b:0});
            return;
        }
        
        if (list.length<1) {
            res.json({a:0,b:0});
            return;
        }

        const {equation : [b,a]} = regression.logarithmic(list,{
                                                             order:4,
                                                             precision:4  
                                                            });
        
        console.log({a,b});

        res.json({a,b});
    }
}