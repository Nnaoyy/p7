<template>
    <div>
        <form >
            <label for="post" >
                <div >
                    <img id="preview"  src="" >   
                </div>                
            </label>
            <input type="file" ref="file" name="post"  @change="selectFile">
            <p id="fileErrMsg"></p>  
            <br/> 
            <label for="postMsg">Titre:</label>
            <input type="text" name="postTitle" id="postTitle" v-model="postTitle"/>
            <p id="postTitleErrMsg"></p>  
            <br/>  
            <br/>         
            <input type="submit" value="envoyer" class="btn" @click.prevent="sendPost">
        </form>
    </div>

</template>

<script>
import axios from 'axios';


export default {
    
    name: 'postMeme',
    data(){
        return{
            postTitle:'',
            file:'',
        }
    },
    methods:{
        selectFile(event) {
            this.file = this.$refs.file.files[0];
            let input = event.target;
            if(input.files) {
                let reader = new FileReader() 
                reader.onload = (e) => {
                    document.getElementById('preview').src = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        sendPost(){
            this.verifFile();
            this.verifTitle();
            if (this.verifFile()  && this.verifTitle()){ 
            let formData = new FormData()
            formData.append('userId', localStorage.getItem('userId'))
            formData.append('file',this.file)
            formData.append('postTitle',this.postTitle)           
            axios.post(`http://localhost:3000/api/post/`, formData,{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            
            
            })
            .then(location.reload())
            .catch(error => { console.log(error)})
            }
            else{
                alert("choisir une fichier valide et un titre.")
            }
        },
        verifFile(){
            if (this.file ==''){
                document.getElementById("fileErrMsg").textContent="Veuillez choisir un fichier.";
            }
            else if( this.file.type !== "image/jpeg" && this.file.type !== "image/jpg" && this.file.type !== "image/png" && this.file.type !== "image/gif"){
                document.getElementById("fileErrMsg").textContent="Le fichier doit êtres au format jpeg, jpg, png ou gif.";
            }
            else{
                document.getElementById("fileErrMsg").textContent="";
                return true
            }
        },
        verifTitle(){
            if (this.postTitle ==''){
                document.getElementById("postTitleErrMsg").textContent="Veuillez saisir un titre.";
            }
            else{
                document.getElementById("postTitleErrMsg").textContent="";
                return true
            }
        }
    }
}
</script>