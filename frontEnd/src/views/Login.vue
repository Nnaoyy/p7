<template>
<div>
  <div>
    <loginSignup msg="Connectez-vous sur Groupomania"/>
  </div>
  
  <div>
    <form class="login">
      <fieldset>
          <label for="mail">Adresse mail</label>
          <input type="email" name="mail" v-model="user.email"/>
        <br/>
          <label for="pass">Mot de passe</label>
          <input type="password" name="pass" v-model="user.password"/>
        <br/>
        <input @click="login" type="submit" value="Connexion" class="button"/>
      </fieldset>
    </form>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

import loginSignup from '@/components/loginSignup.vue'


export default {
  name: 'HomeView',
  data() {
    return{
      user:{
        email: "",
        password: ""
    }
    };
  },
  components: {
    
    loginSignup
  },

  methods:{
    login(event) {
      event.preventDefault();
      const user = {
        ...this.user
      }
      fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(user),
        })  
      .then(console.log(user))
      .catch(error => { error})    
    
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