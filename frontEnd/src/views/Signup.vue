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
            <label for="confirmPass">Confirmation du mot de passe</label>
            <input type="password" name="confirmPass" id="confirmPassword" v-model="newUser.confirmPassword"/>            
            <p id="confirmPasswordErrorMsg"></p>
            <p>Le mot de passe doit contenir au moins 8 charactères avec au moins une majuscule, une minuscule et un chiffre </p>
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
        password: "",
        confirmPassword:""
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
        document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer votre prénom!"
        document.getElementById("firstName").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(this.newUser.firstName)){
        document.getElementById("firstNameErrorMsg").textContent = "Votre prénom ne doit pas contenir de chiffre!";
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
        document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer votre nom!"
        document.getElementById("lastName").style.border = "3px solid red";
      }
      else if (/[0-9]/.test(this.newUser.lastName)){
        document.getElementById("lastNameErrorMsg").textContent = "Votre nom ne doit pas contenir de chiffre!";
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
        document.getElementById("emailErrorMsg").textContent = "Veuillez entrer votre Email!"
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
        document.getElementById("passwordErrorMsg").textContent = "Veuillez entrer votre mot de passe!"
        document.getElementById("password").style.border = "3px solid red";
      }
      else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(this.newUser.password)){
        document.getElementById("passwordErrorMsg").textContent = "Mot de passe non valide!"
        document.getElementById("password").style.border = "3px solid red";
      }
      else if (/[#?!@$%^&*-]/.test(this.newUser.password)){
        document.getElementById("passwordErrorMsg").textContent = "Le mot de passe ne doit pas contenir de charactères spéciaux!"
        document.getElementById("password").style.border = "3px solid red";
      }
      else{
        document.getElementById("passwordErrorMsg").textContent = "Mot de passe valide";
        document.getElementById("password").style.border = "3px solid green";
        return true;
     }
    },
    confirmPassword(){
      if (this.newUser.password !== this.newUser.confirmPassword ){
        document.getElementById("confirmPasswordErrorMsg").textContent = "Entrez le même mot de passe!"
        document.getElementById("confirmPassword").style.border = "3px solid red";
      }
      else if (this.newUser.password == ""){
        document.getElementById("confirmPasswordErrorMsg").textContent = "Entrez le même mot de passe!"
        document.getElementById("confirmPassword").style.border = "3px solid red";
      }
      else{
        document.getElementById("confirmPasswordErrorMsg").textContent = "Confirmation mot de passe valide";
        document.getElementById("confirmPassword").style.border = "3px solid green";
        return true;
      }
    },
    inscription(){
      const self = this;
      self.verifyFirstName();
      self.verifyLastName();
      self.verifyEmail();
      self.verifyPassword();
      self.confirmPassword();
      if (self.verifyFirstName() && self.verifyLastName() && self.verifyEmail() && self.verifyPassword() && self.confirmPassword() ){
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
      .then(res =>{
        if(res.status == 201){
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
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userImg', data.img);
          })
            self.$store.commit('menu_on');
            self.$router.push("/home");
            
            })
          .catch(error => { error})  
        }
        else if(res.status == 401){
          document.getElementById("emailErrorMsg").textContent = "adresse mail déjà utilisée!"
          document.getElementById("email").style.border = "3px solid red";
        }
      })
      .catch(error => { error})    
    }
  } 
}
</script>

