<template>
  <nav id="menu" v-show="menu">
        <img src="./assets/icon-left-font-monochrome-black.svg"  >
        <a  href="#">profil</a>
        <input  type="search" name="search" placeholder="Recherche"/>
        <router-link to="/"  @click="menu_off">Déconnexion</router-link> 
    </nav>
  <router-view/>
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
