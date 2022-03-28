<template>
<div>
  <nav id="menu" v-show="menu  && !nonMenu">
    <router-link to="/home">
        <img src="./assets/icon-left-font-monochrome-black.svg"  >
    </router-link>
    <router-link to="/home/profil" >profil</router-link>
    <input  type="search" name="search" placeholder="Recherche"/>
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

</style>
  
<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['menu']),
    ...mapState(['nonMenu'])
    
    
  },
  methods: {
    logOut() {
      this.$store.commit('menu_off');
      localStorage.setItem('token', null)
      localStorage.setItem('userId', null)
      console.log(localStorage);
    },
    
    
  }
   
}

</script>
