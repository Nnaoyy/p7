<template>
<div>
  <div id="menu" v-show="menu  && !nonMenu">
   <nav> 
    <div id="logoSearch">
      <router-link to="/home">
          <img src="./assets/icon-left-font-monochrome-white.svg"  >
      </router-link>
      <div>
      <input  type="text" id="searchBar" name="search" placeholder="Recherche" v-on:keyup="this.searchProfil()" @blur="hideResult()" @click="showResult()"/>
      <div id="search" v-if="result">
          <router-link v-for="resUser in resultUser" :key="resUser.nom" :to="{name:'profil', params:{id: resUser.id }}"><p> {{resUser.nom}} {{resUser.prenom}}</p></router-link>
        </div>
      
      </div>
      <router-link :to="{name:'profil', params:{id: this.userId }}" id="profilScreen"><img :src=userImg > Profil</router-link>
    </div>

    <router-link :to="{name:'profil', params:{id: this.userId }}" id="profilMobile"><img :src=userImg >Profil</router-link>
    <router-link to="/" @click="logOut" id="logout"><img src="./assets/right-from-bracket-solid.svg"> Déconnexion</router-link> 

  </nav></div>
  <router-view :key="$route.fullPath" />
</div>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data(){
    return{
      result:false,
      userId:localStorage.userId,
      userImg:localStorage.userImg,
      admin:localStorage.admin,   
      resultUser:[],  
    }
  },
  computed: {
    ...mapState(['menu']),
    ...mapState(['nonMenu']),
  
  },
  methods: {
    logOut() {
      this.$store.commit('menu_off');
      localStorage.setItem('token', null)
      localStorage.setItem('userId', null)
      localStorage.setItem('admin', null)
    },
    searchProfil() {
    let input= document.getElementById('searchBar').value;
    if (input !== ""){
      axios.get(`http://localhost:3000/api/user/profil/`, { 
        params: {
          input  
        },
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }          
      })
      .then(reponse =>{
      let data=reponse.data;
      this.resultUser = data;
    
      })
      .catch(function (error) {console.log(error);})
    }
  },
  hideResult(){
    const self = this;
    setTimeout(function () {
      self.result=false;
      document.getElementById('searchBar').value="";  
    }, 100);
  },
  showResult(){
    this.result=true;
    }    
  }
}
</script>

<style lang="scss">
html {
    height: 100%;
}
body{
    margin:0;
    min-height: 100%;
    position: relative;
    z-index: 1; 
    
  }
  .test{
    position: fixed;
    top:0;
    z-index: 3;
    background-color: rgb(218, 216, 216);
    width: 100%;
    height: 100%;
    animation: disparition 2s both; 
    display: flex;
    justify-content: center;
    align-items: center;
}
.chargement{    
    position: absolute;
    left: 50%;
    top: 50vh;
    z-index: 4;
    width: 120px;
    height: 120px;
    margin: -76px 0 0 -76px;
    border: 16px solid white;
    border-radius: 50%;
    border-top: 16px solid blue;
    background-color:  rgba(218, 216, 216, 0.726);
    animation: chargement 2s linear both  ;
}

@keyframes chargement{
  0%{
      transform: rotate(0deg);
  }
  99.9%{
    transform: rotate(720deg);
    opacity:1;
  }
  100%{
      
      opacity:0;
      transform:translatex(-1000px);
  }
}
@keyframes disparition{
  0%{
    opacity:1
  }
  99.9%{
    transform:translatex(0);
    opacity:1;
  }
  100%{
    opacity:0;
    transform:translatex(-3000px);
  }
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(218, 216, 216);
}
.padTop{
  padding-top: 120px;
}
button, input[type=submit]{
  cursor: pointer;
}
//menu principale
.affichage{
  margin-top: 100px;
}
nav {
  padding: 30px;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  
    &.router-link-exact-active {
      color: #a03030;
      text-decoration: underline;
    }
  }
}
#menu{
  position: fixed;
  width: 100%;
  z-index: 4;
  top:0;
  nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
    background-color: #0f477e;
    #logoSearch{
      display: flex;
      gap: 50px;
      align-items: center;
      #searchBar{
        width: 250px;
      }
      #profilScreen{
        display:flex;
        align-items: center;
        gap:3px;
      }
    }
    #profilDecoButton{
      display: flex;
      justify-content: space-between;
    }
    a{
      color:white;
    }
    #profilMobile{
      display: none;
    }
  }
}
img{
  height: 30px;
}
#logout{
  display: flex;
  align-items: center;
  img{
    margin-right: 3px;
  }
}

#search{
  border:2px solid black;
  background-color: white;
  width: 255px;
  position: absolute;
  flex-direction: column;
  a{  
    display:flex;
    margin-left: 10px; 
      p{
          color: black;
      }
  }
}

// login et signup
.loginBack{
  background-color: white;
}
.login{
  fieldset{
    padding: 15px;
    margin-left: 35%;
    margin-right: 35%;
    display: flex;
    flex-direction: column;
    .button{
      margin-left: 30%;
      margin-right: 30%;
    }    
  }
}
#errorMsg{
  color: red;
}
.signup{
  fieldset{
    padding: 15px;
    margin-left: 35%;
    margin-right: 35%;
    display: flex;
    flex-direction: column;
    .button{
      margin-left: 30%;
      margin-right: 30%;
    } 
  }
}
.logo{
  display: flex;
  background: url(./assets/icon.svg) no-repeat center;
  height: 300px;
  justify-content: center;
}
.message{
  display: flex;
  align-items: center;
}

//profilPage

#profilPage{
  position: relative;
  display: flex;
  justify-content: space-around;
  height: 100%;
  margin: 0 10%;
  gap:10%;
  #profilPost{
      flex-direction: column;
      border: 2px solid black;
      margin: 10px 0;
  }
  .buttonProfil{
    margin-top:10px;
  }
}
#profilInfo{
  display: flex;
  gap: 10px;
  
}
.photoProfil{
  width: 200px;
  height:auto;
}
#supprButton{
  background-color: red;
}
//posts

#profil{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 5px;
  div{
    display: flex;
    gap: 5px;
    img{
      padding-top: 5%;
    }
  }
}
#meme{
  img{
      width: 100%;
      height: auto;
  }
  div{
      display: flex;
      justify-content: space-between;
  }
}
#preview{
  height: auto;
  max-height: 300px;
}
#comments{
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(116, 113, 113, 0.795);
  margin: 3px;
  p{
    display: flex;
    align-items: center;
    gap:5px;
    margin:2px;
  }
  #com{
    justify-content: space-between;
    border: 2px solid black;
    padding: 5px;
  }
}
.writeCom{
  display: flex;
  margin: 5px;
  padding: 5px;
  textarea{
      width: 70%;
  }
}
.green{
  background-color: green;
}
.red{
  background-color: red;
}
#post{
      border-radius: 2%;
      margin: 0 10px;
      margin-bottom: 30px;
      background-color: white;
      padding-bottom: 10px;
      button{
        margin: 3px;
        font-size: 15px;
        .logoLike{
          width: 10px;
        }
      }
  }
#posts{
  display:flex;
  margin: 20px auto;
  max-width: 850px;
  justify-items: center;
  
}
#buttonShowMore{
  margin-bottom: 30px;
  width: 150px;
  height: 50px;
  font-size: 100%;
  background-color: #0f477e;
  color: white;
  font-weight: 800;
}

@media all and (max-width:768px){
  #menu{

    nav{
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    padding-left:0;
    gap:10px;
    #logoSearch{  
    gap: 20px;
    #searchBar{
        width: 150px;
      }
    #profilScreen{
      display: none;
    }
    }
    #profilMobile{
      display:flex;
      align-items: center;
      gap:3px;
    }
    }
  }
  #search{
  width: 160px;
  }
  #profilPage{
    flex-direction: column;
    gap: 10px;
    margin: 10px;

  }
  #post{
    margin:5px;
  }
  .login fieldset{
    margin:5px;
  }
  .signup fieldset{
    margin:5px;
  }
  .padTop{
    padding-top: 160px;
  }
  #buttonShowMore{
    margin-top:20px;
  }
}


</style>