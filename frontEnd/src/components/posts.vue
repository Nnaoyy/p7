<template>

<!--a changer avec les données de la BDD -->

    <div >
        <div v-for="post in allPosts" :key="post.user_id" >
        <div id="profil"><!-- qui publie-->
            <img :src=post.imageUrl alt="photo profil miniature">
            <p>{{ post.nom }} {{ post.prenom }}</p>  
            <button @click="idChange" :name=post.postId >X</button>
            
        </div>
        <div id="meme"><!--meme -->
            <h4>{{ post.title }}</h4>
            <img :src=post.file :alt=post.title>
            <div>
                <span>
                <button>like</button>
                <button>dislike</button>
                </span>
                <button>commentaire</button>
            </div>
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
            userId:"",
            profil: document.location.href.includes("profil")
        }
    },
    mounted: function(){
        if(localStorage.token !== "null"){
            if (this.profil){
                this.getAllPostById();
            }
            this.getAllPost();
        }
        else{
            location.reload();
        }
    },
    methods:{
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
</style>