<template>

<!--a changer avec les données de la BDD -->

    <div >
        <div v-for="post in allPosts" :key="post.user_id" id="post">
        <div id="profil"><!-- qui publie-->
            <img :src=post.imageUrl alt="photo profil miniature">
            <p>{{ post.nom }} {{ post.prenom }}</p>  
            <button v-if="post.id==this.userId"   @click="idChange" :name=post.postId >X</button>
            
        </div>
        <div id="meme"><!--meme -->
            <h4>{{ post.title }}</h4>
            <img :src=post.file :alt=post.title>
            <div>
                <span >
                <button @click="like(post.postId)" >like: {{ post.likeNumber }}</button>
                <button >dislike: {{ post.dislikeNumber }}</button>
                </span>
                <button @click="comment">commentaire</button>
            </div>
        </div>
        <div v-if="com">
            <div v-for="com in coms" :key="com.userId">
                <p> {{ com.nom }} {{ com.prenom }} a commenté: </p>
                <p id="com"> {{com.message}} </p>
            </div>
            <form >
                <textarea maxlength="255"></textarea>
                <input type="submit" value="commenter"/>
                <button @click="noComment">annuler</button>
            </form>
        </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';



export default {
    name: 'postsMeme',
    
    data(){
        return{
            allPosts:[],
            postId:"",
            userId:localStorage.userId,
            profil: document.location.href.includes("profil"),
            userAuth:"",
            liked:{type: Boolean, 'default': false},
            disliked:{type: Boolean, 'default': false},
            com:"",
            post_id:""
        }
    },
    components:{
        
    },
   
    mounted: function(){
        if(localStorage.token !== "null"){
            if (this.profil){
                this.getAllPostById();
                
            }
            else{
            this.getAllPost();
            }
        }
        else{
            location.reload();
        }
    },
    methods:{
        comment(){
            this.com=true;
        },
        noComment(){
            this.com=false;
        },
        idChange(e){
            this.postId = e.target.name;
            this.userId = localStorage.userId;
            console.log(this.postId);
            console.log(this.userId);
            this.deletePost();
        },
        getAllPost(){
            const self = this;            
            axios.get(`http://localhost:3000/api/post/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
            }
              
              })  
            .then(function (response) {
            const data = response.data;
            self.allPosts = data;
            })
            .catch(function (error) {
            console.log(error);
            });

        },
        deletePost(){
            console.log(this.postId);
            const userId = this.userId
            axios.delete(`http://localhost:3000/api/post/${this.postId}`,{
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data:{
                    id: userId
                }
            })
            .then(res => {
                if (res.status == 201){
                location.reload()}
                
            })
            .catch(error => {  error, alert("vous n'êtes pas autorisé à supprimer ce contenu!!")})
        },
        getAllPostById(){
            const self = this;            
            axios.get(`http://localhost:3000/api/post/${localStorage.getItem('userId')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
            }
              
              })  
            .then(function (response) {
            const data = response.data;
            self.allPosts = data;
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        like(postid){
            console.log(postid);
            this.post_id =postid
            this.sendLike()
            },
        sendLike(){
            let formData = new FormData()
            formData.append('userId', localStorage.getItem('userId'))
            /*if(this.file){
                console.log(this.file);
                formData.append('file',this.file)
            }
            if (this.postTitle){
                console.log(this.postTitle);
                formData.append('postTitle',this.postTitle)
            }*/
            axios.post(`http://localhost:3000/api/like/`, formData,{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            
            
            })
            .then(res =>{console.log(res.data.user_id)})
            .catch(error => { console.log(error)})
           
        }
        
        
    }
}





</script>

<style lang="scss">
    
    #profil{
        display: flex;
        justify-content: space-around;
        align-items: center;

    }
    #meme{
        img{
            width: 100%;
            height: auto;
        }
        div{
            display: flex;
            justify-content: space-between;
        }
    }
    #green{
        background-color: green;
    }
    #red{
        background-color: red;
    }
    #com{
        border: 2px solid black;
    }
</style>