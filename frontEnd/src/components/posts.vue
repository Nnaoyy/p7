<template>

<!--a changer avec les données de la BDD -->

    <div >
        <div v-for="post in allPosts" :key="post.user_id" id="posts">
        <div id="profil"><!-- qui publie-->
            <img :src=post.imageUrl alt="photo profil miniature">
            <p>{{ post.nom }} {{ post.prenom }}</p>  
            <button @click="idChange" :name=post.postId >X {{ post.postId }} </button>
            
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
            postId:""
            
        }
    },
    mounted: function(){
        this.getAllPost()
    },
    methods:{
        idChange(e){
            this.postId = e.target.name;
            console.log(this.postId);
            this.deletePost();
        },
        getAllPost(){
            const self = this;            
            axios.get(`http://localhost:3000/api/post/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
            axios.delete(`http://localhost:3000/api/post/${this.postId}`,{
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

<style lang="scss">
    #posts{
        border: 2px solid black;
        margin: 20px 30%;
    }
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