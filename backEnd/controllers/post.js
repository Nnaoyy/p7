const connection = require('../config/config.js');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    let imageUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let sql='INSERT INTO `posts`(title, file, user_Id) VALUES (?,?,?)';
    connection.query(sql, [req.body.postTitle ,imageUrl , req.body.userId],
        function(err,result){
         if (err) throw err;
         res.status(201).json({ message: `Post créé `});
        })
};

exports.getAllPost = (req, res, naxt) => {
    let sql = 'SELECT * FROM `posts` JOIN `user` ON `posts`.`user_id` = `user`.`id`';
    connection.query(sql, function (err, result) {
        let posts = result;
        return res.status(200).json(posts)
      })
};

exports.deletePost = (req, res, next) =>{
    console.log(req.body);
    let sql = 'SELECT * FROM `posts` WHERE `postId`=?';
    connection.query(sql, [req.params.id], function(err,result){
        let post = result[0];
        /*if (post.user_id !== ???){
            return res.status(401).json({ error: 'accés non autorisé!' });
          }
        else{*/
            const filename = post.file.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            let sql= 'DELETE FROM `posts` WHERE `postId`=?';
            connection.query(sql, [req.params.id], function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `compte supprimé` });
           })
        })
        /*}*/
    } )
};