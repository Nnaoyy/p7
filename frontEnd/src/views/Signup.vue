<template>
  <div>
    <div>
        <loginSignup msg="Bienvenue sur Groupomania"/>
    </div>
    <div>
      <form class="signup" @submit.prevent="signup">
        <fieldset>
          <label for="name">Nom</label>
          <input type="text" name="name" v-model="newUser.lastName"/>
          <br/>
          <label for="firstName">Prénom</label>
          <input type="text" name="firstName" v-model="newUser.firstName"/>
          <br/>
            <label for="mail">Adresse mail</label>
            <input type="email" name="mail" v-model="newUser.email"/>
          <br/>
            <label for="pass">Mot de passe</label>
            <input type="password" name="pass" v-model="newUser.password"/>
          <br/>
          <input  type="submit" value="S'inscrire" class="button"/>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


    

import loginSignup from '@/components/loginSignup.vue';
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return{
      newUser:{
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    }
    };
  },
  components: {
    loginSignup
  },
  computed: {
    ...mapState(['menu'])
  },
  methods:{
    
    signup() {
      const self = this;
      const user = {
        ...this.newUser
      }
      fetch('http://localhost:3000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(user),
        })  
      .then(function(){
        fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(user),
        })  
        .then(res => {
        const localData = res
        localData.json().then(data => {                
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        })
          self.$store.commit('menu_on');
          self.$router.push("/home");
          
          })
        .catch(error => { error})  
      })
      .catch(error => { error})    
    }
  } 
}
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