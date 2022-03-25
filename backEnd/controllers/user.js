const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/config.js');
const fs = require('fs');


exports.signup = (req, res) => {
  let sql= 'select * from user where email=?';
  connection.query(sql, [req.body.email], function (err, result) {
    let user = result[0];
    if (!user) {
      bcrypt.hash(req.body.password, 8)
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
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
};

exports.getOneUser= (req, res, next) => {
  let sql= 'select * from user where id=?';
  connection.query(sql, [req.params.id], function (err, result) {
    let user = result[0];
    return res.status(200).json(user)
  })
};


exports.userFile= (req, res, next) => {
  let imageUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  let sql= 'select * from user where id=?';
  connection.query(sql, [req.params.id], function (err, result) {
    let user = result[0];
    console.log(user);
      if(user.imageUrl){
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          let sql = 'UPDATE `user` SET `imageUrl` = ? where `id`=?';
          connection.query(sql, [imageUrl, req.params.id],
           function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `photo de profil modifiée` });
           })
        })
      }
      else{
        let sql = 'UPDATE `user` SET `imageUrl` = ? where `id`=?';
          connection.query(sql, [imageUrl, req.params.id],
           function(err,result){
            if (err) throw err;
            res.status(201).json({ message: `photo de profil modifiée` });
           })
          }
        })
    
};
      