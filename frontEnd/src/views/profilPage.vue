<template>
    <div id="profilPage">
        <div>
            <div>
                <img :src=user.imageUrl alt="photo de profil" class="photoProfil">
                <button @click="modifImage" v-if="!this.modif">modification</button>
                <button @click="modifImage" v-if="this.modif">annulation</button>
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

                        <input type="submit" value="modifier" class="btn" @click.prevent="changeFile">
                    </form>
                </div>
                
            </div>
            <div>
                <p>{{ user.nom }}</p>
                <p>{{ user.prenom }}</p>
            </div>
            <button>suprimer le compte</button>

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
          fetch(`http://localhost:3000/api/user/${localStorage.getItem('userId')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
              
              })  
          .then(res => res.json())
          .then(data => {
              this.user = data;
              console.log(this.user);
          })
          .catch(error => { console.log(error)})  
          },
        modifImage(){
            if (!this.modif){
            this.modif = true;
            console.log(this.modif);
            } else {
                this.modif = false;
                console.log(this.modif);
            }

        },
        changeFile(){
            console.log(this.file.name);
            let formData = new FormData()
            formData.append('file', this.file)
            console.log(formData.file);
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
            console.log(this.file);
        }, 
      }
    
    } 


</script>