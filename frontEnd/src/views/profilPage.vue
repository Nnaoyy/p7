<template>
    <div id="profilPage">
        <div>
            <div>
                <img :src=user.imageUrl alt="photo de profil" class="photoProfil">
                <button @click="modifImage" v-if="!this.modif">modification</button>
                <button @click="modifAnnul" v-if="this.modif">annulation</button>
                <div v-if="this.modif">
                    <form >
                        <label for="file" >
                            <div>
                                Changer d'image de profil :
                            </div>
                            <div >
                                <img id="preview" :src="user.profile" :alt="user.profile" class="photoProfil">   
                            </div>                
                        </label>
                        <input type="file" ref="file" name="file" id="file" @change="selectFile"> 
                        <label for="password" >
                            <div>
                                Changer de mot de passe :
                            </div>                
                        </label>
                        <input type="password" ref="password" name="password" id="password" v-model="password">         

                        <input type="submit" value="modifier" class="btn" @click.prevent="changeProfile">
                    </form>
                
                </div>
                
            </div>
            <div>
                <p>{{ user.nom }}</p>
                <p>{{ user.prenom }}</p>
            </div>
            <button @click.prevent="deleteUser" >suprimer le compte</button>

            <!--a rajouter la modification du profil si le profil de l'utilisateur-->
            
        </div>
        <div >
            <div id="profilPost"><!--les post de l'utilisateur-->
                <post/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #profilPage{
        display: flex;
        justify-content: space-around;
        margin: 10px 10%;
        div {
            width: 100%;
        }
        #profilPost{
            flex-direction: column;
            border: 2px solid black;
            margin: 10px 0;
        }
    }
    .photoProfil{
        width: 200px;
        height:auto;
    }
</style>

<script>
    import post from '@/components/post.vue'
    import axios from 'axios';

    export default {
        name: 'postMeme',
        data() {
            return{
            user:{},
            modif:false,
            password:null,
            file:''
            };
            

        },
        components:{
            post,

            
        },
        
    
    mounted: function(){
        this.profil()
    },
    methods:{
        profil(){
            const self = this;            
            axios.get(`http://localhost:3000/api/user/${localStorage.getItem('userId')}`, {
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
        changeProfile(){
            let formData = new FormData()
            if (this.password){
                console.log(this.password);
                formData.append('password',this.password)
            }
            if(this.file){
                console.log(this.file);
                formData.append('file', this.file)
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
            axios.delete(`http://localhost:3000/api/user/${localStorage.getItem('userId')}`,{
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(this.$store.commit('menu_off'),
                localStorage.setItem('token', null),
                localStorage.setItem('userId', null),
                console.log(localStorage),
                this.$router.push("/"))
            .catch(error => { console.log(error)})
            } 
            
      }
    
    } 


</script>