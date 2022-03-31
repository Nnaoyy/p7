const connection = require('../config/config.js');

exports.like = (req, res, next) => {

    let sql='select * from `user_post` where user_id =?'
    connection.query(sql,[req.body.userId],  function(err,result){
        let truc = result[0];
        if(truc){
        console.log(truc);
        return res.status(200).json(truc);}
        else{
            console.log("oups");
            return res.status(400).json(error);
        }
    })
};