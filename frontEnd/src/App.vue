<template>
<div>
  <nav id="menu" v-show="menu">
    <router-link to="/home">
        <img src="./assets/icon-left-font-monochrome-black.svg"  >
    </router-link>
    <router-link to="/home/profil">profil</router-link>
    <input  type="search" name="search" placeholder="Recherche"/>
    <router-link to="/" @click="menu_off" >Déconnexion</router-link>  
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

import { mapState, } from 'vuex'

export default {
  computed: {
    ...mapState(['menu'])
    
  },
  methods: {
    menu_off() {
      this.$store.commit('menu_off')
    }
  }
   
}

</script>
