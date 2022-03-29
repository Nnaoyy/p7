<template>
<div>
  <nav>
    <router-link to="/">Connexion</router-link> |
    <router-link to="/signup">Créer un compte</router-link>
    
  </nav> 
  <div >
    <div class="truc">
    <div class="message">
        <h1>{{ msg }} </h1>
    </div>
    </div>
  </div>
  </div>
</template>

<style lang="scss">


.truc{
    display: flex;
    background: url(../assets/icon.svg) no-repeat center;
    height: 300px;
    justify-content: center;
  }
  .message{
    display: flex;
    align-items: center;
  }
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'loginSignup',
  props: {
    msg: String
  },
  computed: {
    ...mapState(['menu'])
  },
  methods: {
    menu_on(){
      this.$store.commit('menu_on')
    }
    }
  }

</script>
