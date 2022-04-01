const connection = require('../config/config.js');

exports.like = (req, res, next) => {
    const likeStatus = req.body.like;
    // récupère l'id de l'URL
    const postId = req.body.postId;
    // récupère le userId
    const userId = req.body.userId;
    switch(likeStatus) {
        // ajout d'un like
        case 1:
            let sql='insert into postLike (`user_id`, `post_id`) values (?,?)';
            connection.query(sql,[req.body.userId, req.body.postId],  function(err,result){
                if (err) throw err;
                let sql2='update posts set `likeNumber` =likeNumber + 1 where postId=?';
                connection.query(sql2,[req.body.postId],  function(err,result){
                    if (err) throw err;
                    return res.status(201).json({ message: `like ajouté`})
                })

            });
            break;
        //ajout d'un dislike    
        case -1:
            let sql2='insert into postDislike (`user_id`, `post_id`) values (?,?)';
            connection.query(sql2,[req.body.userId, req.body.postId],  function(err,result){
                if (err) throw err;
                let sql2='update posts set `dislikeNumber` =dislikeNumber + 1 where postId=?';
                connection.query(sql2,[req.body.postId],  function(err,result){
                    if (err) throw err;
                    return res.status(201).json({ message: `dislike ajouté`})
                })

            })
            break;
        // suppression like et dislike    
        case 0:
            let sql3='select * from `postLike` where user_id =? and post_id =?';
            connection.query(sql3,[req.body.userId, req.body.postId],  function(err,result){  
                if(result[0]){
                    let sql='delete from postLike where user_id =? and post_id =?';
                    connection.query(sql,[req.body.userId, req.body.postId],  function(err,result){
                        if (err) throw err;
                        let sql='update posts set `likeNumber` =likeNumber - 1 where postId=?';
                        connection.query(sql,[req.body.postId],  function(err,result){
                            if (err) throw err;
                            return res.status(200).json({ message: `like supprimé`})
                        })

                    })
                }
            })

            let sql4='select * from `postDislike` where user_id =? and post_id =?';
            connection.query(sql4,[req.body.userId, req.body.postId],  function(err,result){  
                if(result[0]){
                    let sql='delete from postDislike where user_id =? and post_id =?';
                    connection.query(sql,[req.body.userId, req.body.postId],  function(err,result){
                        if (err) throw err;
                        let sql='update posts set `dislikeNumber` =dislikeNumber - 1 where postId=?';
                        connection.query(sql,[req.body.postId],  function(err,result){
                            if (err) throw err;
                            return res.status(200).json({ message: `dislike supprimé`})
                        })

                    })
                }
            })
            break;
          
    }
};

exports.isLike = ( req, res, next) => {
    let sql='select * from `postLike` where user_id =?';
    connection.query(sql,[req.params.id],  function(err,result){
        if (result){
            return res.status(201).json(result);
        }
    });
    
};

exports.isDislike = ( req, res, next) => {
    let sql='select * from `postdislike` where user_id =?';
    connection.query(sql,[req.params.id],  function(err,result){
        if (result){
            return res.status(201).json(result);
        }
    });
    
};