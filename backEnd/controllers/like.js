const connection = require('../config/config.js');

exports.like = (req, res, next) => {

    let sql='select * from `user_post` where user_id =? and post_id =?';
    connection.query(sql,[req.body.userId, req.body.postId],  function(err,result){  
        if(result[0]){
        console.log(result[0]);
        return res.status(401).json({ error: 'Utilisateur a déjà like !' });}
        else{
            let sql='insert into user_post (`user_id`, `post_id`) values (?,?)';
            connection.query(sql,[req.body.userId, req.body.postId],  function(err,result){
                if (err) throw err;
                let sql2='update posts set `likeNumber` =likeNumber + 1 where postId=?';
                connection.query(sql2,[req.body.postId],  function(err,result){
                    if (err) throw err;
                    return res.status(201).json({ message: `like ajouté`})
                })

            })
        }
    })
};