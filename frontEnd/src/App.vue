<template>
<div>
  <nav id="menu" v-show="menu  && !nonMenu">
    <router-link to="/home">
        <img src="./assets/icon-left-font-monochrome-black.svg"  >
    </router-link>
    <router-link :to="{name:'profil', params:{id: this.userId }}" >profil</router-link>
    <div>
    <input  type="text" id="searchBar" name="search" placeholder="Recherche" v-on:keyup="this.searchProfil()" />
    <div id="search" >

    </div>
    </div>
    <router-link to="/" @click="logOut" >Déconnexion</router-link>  
  </nav>
  <router-view/>
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }
  }
}

</style>
  
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data(){
    return{
      resultUser:[],
      userId:localStorage.userId,
      
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
    },
    searchProfil() {
    let input = document.getElementById('searchBar').value;

    axios.get(`http://localhost:3000/api/user/profil/`, { 
      params: {
        input  
      },
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
            
    })
    .then(reponse =>{console.log(reponse.data);
    let data=reponse.data;
    let search = document.getElementById("search");
    if (search.hasChildNodes()){
      search.removeChild(search.firstElementChild);
      } 
      let list = document.createElement("ul");
      search.appendChild(list);
    for(let user of data){
     
      let result = document.createElement("li");
      let router = document.createElement("a");
      let profil = document.createElement("p");
      
      list.appendChild(result);
      result.appendChild(router);
      router.appendChild(profil);
      list.id="result";
      router.href = "http://localhost:8080/#/home/profil/"+user.id;
      profil.textContent = user.nom +" " +user.prenom;
      
    }
    
    })
    .catch(function (error) {console.log(error);})
}
    
  }
   
}

</script>
