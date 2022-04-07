<template>
    <div>
        <form >
            <label for="post" >
                <div >
                    <img id="preview"  src="" >   
                </div>                
            </label>
            <input type="file" ref="file" name="post"  @change="selectFile"><br/> 
            <label for="postMsg">Titre:</label>
            <input type="text" name="postTitle" id="postTitle" v-model="postTitle"/>  
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
        sendPost(){
            let formData = new FormData()
            formData.append('userId', localStorage.getItem('userId'))
            if(this.file){
                console.log(this.file);
                formData.append('file',this.file)
            }
            if (this.postTitle){
                console.log(this.postTitle);
                formData.append('postTitle',this.postTitle)
            }
            axios.post(`http://localhost:3000/api/post/`, formData,{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            
            
            })
            .then(location.reload())
            .catch(error => { console.log(error)})
        }
    }
}
</script>