# projet 7 du parcours développeur web d'openclassrooms

Le projet consiste à construire un réseau social interne pour les employés de Groupomania.
Le but de cet outil est de faciliter les interactions entre collègues.

Pour lancer le serveur vous aurez besoin de nodejs et mysql.

## Préparation de la base de donnée

Utilisez le fichier "groupomania.sql" pour creer la base de donnée nécessaire.
Créez une base de donée et importez le fichier sql pour créer les tables 

Au niveau du backend il faudra créer un fichier ".env"

et copier dedans:
"
DB_HOST = 
DB_USER = 
DB_PASSWORD = 
DB_DATABASE = 
"
en rentrant les différentes données
DB_HOST là où se situe la base de donée (par defaut "localhost"),
DB_USER votre nom d'utilisateur mysql (par defaut "root"),
DB_PASSWORD le mot de passe qui corespont a votre user Mysql,
DB_DATABASE le nom donné a la base de donée.

Dans la base de donée un compte administrateur est déjà présent avec comme identifiant,
login:admin@123.fr
mdp:Admin123

## Lancement du site

### Coté Backend

Dans un terminal déplacez vous jusqu'au dossier backEnd et effectuez les commandes:
"npm install"
"node server"

### Coté Frontend

Dans un terminal déplacez vous jusqu'au dossier frontEnd et effectuez les commandes:
"npm install"
"npm run serve"




