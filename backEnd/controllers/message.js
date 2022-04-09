const connection = require('../config/config.js');

exports.createMessage = (req, res, next) => {
    let sql='insert into messages ( postId , userId , message , messageDate , messageTime) values (?,?,?,?,?)';
    connection.query(sql, [req.body.postId , req.body.userId , req.body.message , req.body.date , req.body.time], function(err, result){
        if(err) throw err;
        return res.status(200).json({message: 'commentaire envoyé'});
    })
};

exports.getAllMessage = ( req, res, next) => {
    let sql=`select * ,DATE_FORMAT(messageDate, "%d/%m/%Y") from messages join user on messages.userId = user.id where postId=?  order by messageId ;`;
    connection.query(sql, [req.params.id], function(err, result){
        let messages = result;
        return res.status(200).json(messages)
    })
};

exports.deleteMessage = ( req, res, next) => {
    let sql = 'SELECT * FROM `messages` WHERE `messageId`=?';
    connection.query(sql, [req.params.id], function(err,result){
        let message = result[0];
        if (message.userId !== req.body.userId && req.body.admin !== 'true'){
            
            return res.status(401).json({ error: 'accés non autorisé!' });
          }
        else{
            let sql= 'DELETE FROM `messages` WHERE `messageId`=?';
            connection.query(sql, [req.params.id], function(err,result){
            if (err) throw err;
            res.status(201).json({ message });
           })
        }
    } )
};