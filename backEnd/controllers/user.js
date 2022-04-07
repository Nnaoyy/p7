const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/config.js');
const fs = require('fs');


exports.signup = (req, res) => {
  let sql= 'select * from user where email=?';
  connection.query(sql, [req.body.email], function (err, result) {
    let user = result[0];
    if (!user) {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = ({
              ...req.body,
              password: hash
          });
          let sql = 'insert into user (nom, prenom, email,password) values (?,?,?,?)';
          connection.query(sql, [user.lastName, user.firstName, user.email, user.password],
           function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `Utilisateur ${user.firstName} ajouté` });
           })
      })    
      .catch(error => res.status(500).json(error));
    } else {
      res.status(401).json({ message: "Email déjà utilisée!" })
    }
  })
  
};

exports.login = (req, res, next) => {
  let sql= 'select * from user where email=?';
  connection.query(sql, [req.body.email], function (err, result) {
    let user = result[0];
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        if(user.admin == 1){
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          ),
          img:user.imageUrl,
          admin:true
        });}
        else{
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
            img:user.imageUrl,
          });
        }
      })
      .catch(error => res.status(500).json({ error: 'problème serveur' }));
  })
};

exports.getOneUser= (req, res, next) => {
  let sql= 'select * from user where id=?';
  connection.query(sql, [req.params.id], function (err, result) {
    let user = result[0];
    return res.status(200).json(user)
  })
};


exports.userUpdate= (req, res, next) => {
  // on vérifie si l'user a uploadé une nouvelle photo
    if (req.file) {
  let imageUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  let sql= 'select * from user where id=?';
  connection.query(sql, [req.params.id], function (err, result) {
    let user = result[0];
    //on supprime l'ancienne photo sauf si c'est la photo par defaut et on enregistre l'url de la nouvelle
        const filename = user.imageUrl.split('/images/')[1];
        if(filename !== "photoProfil_defaut.jpg"){
        fs.unlink(`images/${filename}`, () => {
          let sql = 'UPDATE `user` SET `imageUrl` = ? where `id`=?';
          connection.query(sql, [imageUrl, req.params.id],
           function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `photo de profil modifiée` });
           })
        })
      }
      //sinon on enregistre directement l'url de la nouvelle photo
      else{
        let sql = 'UPDATE `user` SET `imageUrl` = ? where `id`=?';
          connection.query(sql, [imageUrl, req.params.id],
           function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `photo de profil modifiée` });
           })
          }
        })
      } 
      //si il y a changement de mot de passe on hash le nouveau et on l'enregistre   
      if (req.body.password){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          req.body.password= hash;
          let sql = 'UPDATE `user` SET `password` = ? where `id`=?';
          connection.query(sql, [req.body.password, req.params.id],
           function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `Mot de passe modifié` });
           })
        })
        .catch(error => res.status(400).json({ error }));

      }
};

exports.deleteUser= (req, res, next) =>{
  let sql= 'select * from user where id=?';
  connection.query(sql, [req.params.id], function (err, result) {
    let user = result[0];
    //si l'utilisateur n'est pas le propriétaire du compte ou l'admin
    if (user.id !== Number(req.params.id) && req.body.admin !== true){
      return res.status(401).json({ error: 'accés non autorisé!' });
    }
    else {
      let sql ='SELECT * FROM postLike where user_id = ?';
      connection.query(sql, [req.params.id], function(err,result){
        let like = result;
        if (like){
          for (let i of like){
          let sql='update posts set `likeNumber` =likeNumber - 1 where postId=?';
          connection.query(sql,[i.post_id],  function(err,result){
          if (err) throw err;
          
          })}
        }
      })
      let sql2 ='SELECT * FROM postDislike where user_id = ?';
      connection.query(sql2, [req.params.id], function(err,result){
        let dislike = result;
        if(dislike){
          for (let i of dislike){
          let sql='update posts set `dislikeNumber` =dislikeNumber - 1 where postId=?';
          connection.query(sql,[i.post_id],  function(err,result){
          if (err) throw err;
          
          })}
        }
      })
      //si il y a une photo de profil on la supprime et on supprime le compte
      
      const filename = user.imageUrl.split('/images/')[1];
      if(filename !== "photoProfil_defaut.jpg"){
        fs.unlink(`images/${filename}`, () => {
          let sql= 'DELETE FROM `user` WHERE `id`=?';
          connection.query(sql, [req.params.id], function(err,result){
            if (err) throw err;
            return res.status(201).json({ message: `compte supprimé` });
          })
        })
      }
      else{
        //si il n'y a pas de photo de profil on supprime le compte
        let sql= 'DELETE FROM `user` WHERE `id`=?';
        connection.query(sql, [req.params.id], function(err,result){
        if (err) throw err;
          return res.status(201).json({ message: `compte supprimé` });
        })
      }
      
    }
  })
};
      

exports.findUser = (req ,res ,next ) =>{

  let sql=`SELECT * FROM user WHERE nom LIKE '%${req.query.input}%' OR prenom LIKE '%${req.query.input}%' ORDER BY nom LIMIT 12;`;
  connection.query(sql, [req.query.input], function(err, result){ 
    let user = result;
    return res.status(201).json(user)
  })
};