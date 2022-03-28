<template>
    <div>
        <form >
            <label for="post" >
                <div >
                    <img id="preview"  src="" >   
                </div>                
            </label>
            <input type="file" ref="file" name="post" id="post" @change="selectFile"> 
            <label for="postMsg">Titre:</label>
            <input type="text" name="postTitle" id="postTitle" />            
            <input type="submit" value="envoyer" class="btn" @click.prevent="sendPost">
        </form>
    </div>

</template>

<script>


export default {
    name: 'postMeme',
    data(){
        return{
            
            file:''
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
            
        }
    }
}
</script>