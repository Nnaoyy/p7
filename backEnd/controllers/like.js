const connection = require('../config/config.js');

exports.like = (req, res, next) => {
    console.log(req.body);/*
    let sql='select * from `user_post` where user_id =?'
    connection.query(sql,[req.body.userId],  function(err,result){
        if(result){
        console.log(result);
        return res.status(200).json(result);}
        else{
            console.log("oups");
            return res.status(400).json(error);
        }
    })*/
};