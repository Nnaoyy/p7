<template >
<div class="loginBack">
  <div>
    <loginSignup msg="Connectez-vous sur Groupomania"/>
  </div>
  
  <div>
    <form class="login" @submit.prevent="login" >
      <fieldset>
          <label for="mail">Adresse mail</label>
          <input type="email" name="mail" v-model="user.email"/>
        <br/>
          <label for="pass">Mot de passe</label>
          <input type="password" name="pass" v-model="user.password"/>
        <br/>
          <p id="errorMsg"></p>
        <input type="submit" value="Connexion" class="button"/>
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
  name: 'LogIn',
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
  computed: {
    ...mapState(['menu'])
  },
  //si le token d'identification est présent on envoie sur la page principale
  beforeCreate(){
    if (localStorage.getItem('token')!== 'null'){
      this.$store.commit('menu_on');
      this.$router.push('/home');
      } 
  },
  methods:{
    
      
 
   login() {
      const self = this;
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
      .then(res => {
        if (res.status == 200){
        const localData = res
        localData.json().then(data => {                
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userImg', data.img);
        if(data.admin == true){
          localStorage.setItem('admin', data.admin); 
        }
        console.log(localStorage);
        })  
        self.$store.commit('menu_on');
        self.$router.push("/home"); 
        }
        else{
          document.getElementById("errorMsg").textContent = "adresse mail ou mot de passe incorect";
        }
        })
      .catch(error => { error})    
    
    }
      
  }
}
</script>

