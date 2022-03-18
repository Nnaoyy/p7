<template>
  <nav>
    <router-link to="/">Connexion</router-link> |
    <router-link to="/signup">Créer un compte</router-link>
    <!--à supprimer plus tard -->
    |<router-link to="/home" @click="menu_on"> Page principale</router-link>
  </nav> 
  <div >
    <div class="truc">
    <div class="message">
        <h1>{{ msg }} </h1>
    </div>
    </div>
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
