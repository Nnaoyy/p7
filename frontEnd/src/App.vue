<template>
<div>
  <nav id="menu" v-show="menu  && !nonMenu">
    <router-link to="/home">
        <img src="./assets/icon-left-font-monochrome-white.svg"  >
    </router-link>
    <router-link :to="{name:'profil', params:{id: this.userId }}" >profil</router-link>
    <div>
    <input  type="text" id="searchBar" name="search" placeholder="Recherche" v-on:keyup="this.searchProfil()" @blur="hideResult()" @click="showResult()"/>
    <div id="search" v-if="result">
      <div v-for="resUser in resultUser" :key="resUser.nom" id="truc">
        <router-link :to="{name:'profil', params:{id: resUser.id }}"><p> {{resUser.nom}} {{resUser.prenom}}</p></router-link>
      </div>
    </div>
    </div>
    <router-link to="/" @click="logOut" >Déconnexion</router-link>  
  </nav>
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
      console.log(self.result);  
    }, 100);
  },
  showResult(){
    this.result=true;
    console.log(this.result);
    }    
  }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgba(218, 216, 216, 0.726);
}

//menu principale

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  background-color: #0f477e;
  a{
    color:white;
  }
  
}
img{
  height: 30px;
}

#search{
  border:2px solid black;
  background-color: white;
  width: 177px;
  position: absolute;
  div{
    a{
      p{
          color: black;
      }
    }
    
  
  
    
    
    
  }

}

// login et signup

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
  display: flex;
  justify-content: space-around;
  margin: 10px 10%;
  gap:10%;
  /*div {
      width: 100%;
  }*/
  #profilPost{
      flex-direction: column;
      border: 2px solid black;
      margin: 10px 0;
  }
}
.photoProfil{
  width: 200px;
  height:auto;
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
#writeCom{
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
        border: none;
        border-radius: 50%;
      }
  }
#posts{
  display:flex;
  margin: 20px auto;
  max-width: 850px;
  justify-items: center;
  
}

.loginBack{
  background-color: white;
}

</style>