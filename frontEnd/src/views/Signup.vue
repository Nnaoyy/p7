<template>
  <div  class="loginBack">
    <div>
        <loginSignup msg="Bienvenue sur Groupomania"/>
    </div>
    <div>
      <form class="signup" @submit.prevent="inscription">
        <fieldset>
          <label for="lastName">Nom</label>
          <input type="text" name="lastName" id="lastName" v-model="newUser.lastName"/>
          <p id="lastNameErrorMsg"></p>
          <label for="firstName">Prénom</label>
          <input type="text" name="firstName" id="firstName" v-model="newUser.firstName"/>
          <p id="firstNameErrorMsg"></p>
            <label for="mail">Adresse mail</label>
            <input type="email" name="mail" id="email" v-model="newUser.email"/>
            <p id="emailErrorMsg"></p>
            <label for="pass">Mot de passe</label>
            <input type="password" name="pass" id="password" v-model="newUser.password"/>            
            <p id="passwordErrorMsg"></p>
            <p>le mot de passe doit contenir au moins 8 charactère avec au moins une Majuscule, une minuscule et un chiffre </p>
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
    verifyFirstName() {
      if (this.newUser.firstName == ""){
        document.getElementById("firstNameErrorMsg").textContent = "veuillez entrer votre prénom!"
        document.getElementById("firstName").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(this.newUser.firstName)){
        document.getElementById("firstNameErrorMsg").textContent = "votre prénom ne doit pas contenir de chiffre!";
        document.getElementById("firstName").style.border = "3px solid red";
      }
      
      else{
        document.getElementById("firstName").style.border = "3px solid green";
        document.getElementById("firstNameErrorMsg").textContent = ""; 
        return true;
      }
    },
    verifyLastName() {
      if (this.newUser.lastName == ""){
        document.getElementById("lastNameErrorMsg").textContent = "veuillez entrer votre nom!"
        document.getElementById("lastName").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(this.newUser.lastName)){
        document.getElementById("lastNameErrorMsg").textContent = "votre nom ne doit pas contenir de chiffre!";
        document.getElementById("lastName").style.border = "3px solid red";
      }
      else{
        document.getElementById("lastNameErrorMsg").textContent = "";
        document.getElementById("lastName").style.border = "3px solid green";
        return true;
      }
    },
    verifyEmail() {
      if (this.newUser.email == ""){
        document.getElementById("emailErrorMsg").textContent = "veuillez entrer votre Email!"
        document.getElementById("email").style.border = "3px solid red";
      }
      else if (!/^[a-z0-9\-_.]+@[a-z0-9]+\.[a-z]{2,5}$/i.test(this.newUser.email)){
        document.getElementById("emailErrorMsg").textContent = "Email non valide!"
        document.getElementById("email").style.border = "3px solid red";
      }
      else{
        document.getElementById("emailErrorMsg").textContent = "Email Valide";
        document.getElementById("email").style.border = "3px solid green";
        return true;
     }
    },
    verifyPassword() {
      if (this.newUser.password == ""){
        document.getElementById("passwordErrorMsg").textContent = "veuillez entrer votre mot de passe!"
        document.getElementById("password").style.border = "3px solid red";
      }
      else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(this.newUser.password)){
        document.getElementById("passwordErrorMsg").textContent = "Mot de passe non valide!"
        document.getElementById("password").style.border = "3px solid red";
      }
      else if (/[#?!@$%^&*-]/.test(this.newUser.password)){
        document.getElementById("passwordErrorMsg").textContent = "Le mot de passe ne doit pas contenir de charactère spéciaux!"
        document.getElementById("password").style.border = "3px solid red";
      }
      else{
        document.getElementById("passwordErrorMsg").textContent = "Mot de passe valide";
        document.getElementById("password").style.border = "3px solid green";
        return true;
     }
    },
    inscription(){
      const self = this;
      self.verifyFirstName();
      self.verifyLastName();
      self.verifyEmail();
      self.verifyPassword();
      if (self.verifyFirstName() && self.verifyLastName() && self.verifyEmail() && self.verifyPassword()){
        self.signup()
      }
      
    },
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
  
  
</style>