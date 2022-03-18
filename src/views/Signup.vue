<template>
<div>
    <loginSignup msg="Bienvenue sur Groupomania"/>
  </div>
  <div>
    <form class="signup">
      <fieldset>
        <label for="name">Nom</label>
        <input type="text" name="name" id="name"/>
        <br/>
        <label for="firstName">Prénom</label>
        <input type="text" name="firstName" id="firstName"/>
        <br/>
          <label for="mail">Adresse mail</label>
          <input type="email" name="mail" id="email"/>
        <br/>
          <label for="pass">Mot de passe</label>
          <input type="password" name="pass" id="password"/>
        <br/>
        <input @click="signup" type="submit" value="S'inscrire" class="button"/>
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
    signup() {

    }
  }
};
</script>

<style lang="scss">
  .image{
    height: 300px;
    width: auto;
  }
  .truc{
    display: flex;
    background: url(../assets/icon.svg) no-repeat center;
    height: 300px;
    justify-content: center;
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
</style>