<template>
    <div id="profilPage" class="padTop">
        <div class="test"><div class="chargement"></div></div>
        <div>
            <div>
                <div id="profilInfo">   
                <img :src=user.imageUrl alt="photo de profil" class="photoProfil">
                    <div>
                        <p>{{ user.nom }}</p>
                        <p>{{ user.prenom }}</p>
                        <button @click="modifImage" v-if="!this.modif && user.id==userId" class="buttonProfil">modification</button>
                    </div>
                </div> 
                
                <div v-if="this.modif">
                    <form >
                        <label for="file" >
                            <p> Changer d'image de profil :</p>
                            <div >
                                <img id="preview" :src="user.profile" :alt="user.profile" class="photoProfil">   
                            </div>                
                        </label>
                        <input type="file" ref="file" name="file" id="file" @change="selectFile"> 
                        <br/>
                        <br/>
                        <label for="pass">Nouveau mot de passe:</label>
                        <br/>
                        <input type="password" name="pass" id="password" v-model="password">            
                        <p id="passwordErrorMsg"></p>
                        <p>le mot de passe doit contenir au moins 8 charactère avec au moins une Majuscule, une minuscule et un chiffre </p>       

                        <input type="submit" value="modifier" class="btn" @click.prevent="modifProfil"><br/>
                        <button @click="modifAnnul" v-if="this.modif && user.id==userId" class="buttonProfil">annuler</button>
                    </form>
                
                </div>
                
            </div>
            <br/>
            <button v-if="user.id == this.userId || this.admin == 'true'" @click.prevent="deleteUser" >suprimer le compte</button>

            <!--a rajouter la modification du profil si le profil de l'utilisateur-->
            
        </div>
        <div >
            <!--les post de l'utilisateur-->
            <posts/>   
        </div>
    </div>
</template>


<script>
    import posts from '@/components/posts.vue'
    import axios from 'axios';
    
    export default {
        name: 'postMeme',
        data() {
            return{
            user:{},
            modif:false,
            password:null,
            file:'',
            userId: localStorage.userId,
            admin:localStorage.admin,
            };
            

        },
        
        components:{
            posts,

            
        },
        
    
    mounted: function(){
        this.profil()
    },
    methods:{
        verifyPassword() {
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(this.password)){
        document.getElementById("passwordErrorMsg").textContent = "Mot de passe non valide!"
        document.getElementById("password").style.border = "3px solid red";
        }
        else if (/[#?!@$%^&*-]/.test(this.password)){
        document.getElementById("passwordErrorMsg").textContent = "Le mot de passe ne doit pas contenir de charactère spéciaux!"
        document.getElementById("password").style.border = "3px solid red";
        }
        else{
        document.getElementById("passwordErrorMsg").textContent = "Mot de passe valide";
        document.getElementById("password").style.border = "3px solid green";
        return true;
     }
    },

        profil(){
            let url = window.location.href;
            let userId=url.split("profil/")[1];
            const self = this;            
            axios.get(`http://localhost:3000/api/user/profil/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
            }
              
              })  
            .then(function (response) {
            const data = response.data;
            self.user = data;
            })
            .catch(function (error) {
            console.log(error);
            });

        },
        modifImage(){
            if (!this.modif){
            this.modif = true;
            } else {
            this.modif = false;
            }

        },
        modifAnnul(){
            this.modif = false;
            this.file="";
            this.password=null;
        },
        modifProfil(){
           
            if (this.password){
                if (this.verifyPassword()){
                    this.changeProfile();
                }
                
            }
            if (this.file && !this.password){
                this.changeProfile();
            }
        },
        changeProfile(){
            
            let formData = new FormData()
            
            if(this.file){
                formData.append('file',this.file)
            }
            if (this.password){
                formData.append('password',this.password)
            }
            axios.put(`http://localhost:3000/api/user/${localStorage.getItem('userId')}`, formData,{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            
            
            })
            .then(this.modif=false,location.reload())
                
            
            .catch(error => { console.log(error)})

        },
        selectFile(event) {
            this.file = this.$refs.file.files[0]
            let input = event.target
            
            if(input.files) {
                let reader = new FileReader() 
                reader.onload = (e) => {
                    document.getElementById('preview').src = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
            
        },
        deleteUser(){
            let result = confirm("voulez-vous vraiment supprimer ce compte?");
            if (result){
                let url = window.location.href;
                let userId=url.split("profil/")[1];
                axios.delete(`http://localhost:3000/api/user/${userId}`,{
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body:{
                        admin:this.admin,
                    }
                })
                .then(res=>{
                    if(res.status == 201){
                        if(this.admin == 'true'){
                            this.$router.push("/home");
                        }
                        else{
                    this.$store.commit('menu_off'),
                    localStorage.setItem('token', null),
                    localStorage.setItem('userId', null),
                    localStorage.setItem('admin', null),
                    this.$router.push("/")}}
                    })
                .catch(error => { console.log(error)})
            }
        }         
    }    
}
</script>