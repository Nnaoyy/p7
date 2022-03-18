<template>
  <div>
    <loginSignup msg="Connectez-vous sur Groupomania"/>
  </div>
  
  <div>
    <form class="login">
      <fieldset>
          <label for="mail">Adresse mail</label>
          <input type="email" name="mail" id="email"/>
        <br/>
          <label for="pass">Mot de passe</label>
          <input type="password" name="pass" id="password"/>
        <br/>
        <input @click="login" type="submit" value="Connexion" class="button"/>
      </fieldset>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import loginSignup from '@/components/loginSignup.vue'


export default {
  name: 'HomeView',
  components: {
    
    loginSignup
  },

  methods:{
    login() {

    }
  }
};
</script>

<style lang="scss">
  
  
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
  
</style>