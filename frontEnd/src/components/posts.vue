<template>
    <div >
        <div v-for="post in allPosts" :key="post.user_id" id="post">
        <div id="profil"><!-- qui publie-->
            <div>
                <img :src=post.imageUrl alt="photo profil miniature">
                <p>{{ post.nom }} {{ post.prenom }} le {{ this.postDate[post.postId] }}</p> 
            </div> 
            <button v-if="post.id==this.userId || this.admin == 'true'"   @click="idChange" :name=post.postId >X</button>
            
        </div>
        <div id="meme"><!--meme -->
            <h4>{{ post.title }}</h4>
            <img :src=post.file :alt=post.title>
            <div>
                <span v-if="liked[post.postId]">
                <button @click="likeOff(post.postId); this.likeNbr[post.postId]-=1" class="green" ><img src="../assets/up-long-solid.svg" class="logoLike"> {{ this.likeNbr[post.postId] }}</button>
                <button disabled><img src="../assets/down-long-solid.svg" class="logoLike"> {{ this.dislikeNbr[post.postId] }}</button>
                </span>
                <span v-else-if="disliked[post.postId]">
                <button disabled ><img src="../assets/up-long-solid.svg" class="logoLike"> {{ this.likeNbr[post.postId] }}</button>
                <button @click="dislikeOff(post.postId);this.dislikeNbr[post.postId]-=1" class="red"><img src="../assets/down-long-solid.svg" class="logoLike"> {{ this.dislikeNbr[post.postId]  }}</button>
                </span>
                <span v-else>
                <button @click="like(post.postId); this.likeNbr[post.postId]+=1" ><img src="../assets/up-long-solid.svg" class="logoLike"> {{ this.likeNbr[post.postId]  }}</button>
                <button @click="dislike(post.postId); this.dislikeNbr[post.postId]+=1"><img src="../assets/down-long-solid.svg" class="logoLike"> {{ this.dislikeNbr[post.postId]}}</button>
                </span>
                <button @click="comment(post.postId)">commentaire</button>
            </div>
        </div>
        <div v-show="com[post.postId]" >
            <div v-for="com in allComs[post.postId]" :key="com.id" id="comments">
                
                <p> <img :src=com.imageUrl alt="photo profil miniature"> 
                    {{ com.nom }} {{ com.prenom }} a commenté, le {{ this.msgDate[com.postId] }} : </p>
                <p id="com"> {{com.message}} <button v-if="com.id==this.userId || this.admin == 'true'"   @click="deleteMessage(com.messageId)" >X</button></p>
            </div>
            <form  @submit.prevent="sendComment(post.postId)" class="writeCom">
                <textarea maxlength="255" v-model="newComment.message" placeholder="écrivez votre commentaire (max 255 charactère)"></textarea>
                <input type="submit" value="commenter"/>   
            </form>
            <button @click="noComment(post.postId)">annuler</button>
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
            admin:localStorage.admin,
            profil: document.location.href.includes("profil"),
            userAuth:"",
            liked:[],
            disliked:[],
            com:[],
            post_id:"",
            newComment:{
                postId:"",
                userId:"",
                message:"",
                date:"",
                time:"",
            },
            allComs:[],
            likeStatus:0,
            likeNbr:[],
            dislikeNbr:[],
            postDate:[],
            msgDate:[],
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
        
        //Partie Post
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
            console.log(self.allPosts);
            for(let i of self.allPosts){
                self.likeNbr[i.postId]=i.likeNumber;
                self.dislikeNbr[i.postId]=i.dislikeNumber;
                let date = i["DATE_FORMAT(postDate, \"%d/%m/%Y\")"];
                self.postDate[i.postId]=date;
                

            }
            self.isLike();
            self.isDislike()
            })
            .catch(function (error) {
            console.log(error);
            });

        },
        idChange(e){
            this.postId = e.target.name;
            this.userId = localStorage.userId;
            this.deletePost();
        },
        deletePost(){
            const userId = this.userId;
            const admin = this.admin;
            axios.delete(`http://localhost:3000/api/post/${this.postId}`,{
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data:{
                    id: userId,
                    admin
                }
            })
            .then(res => {
                if (res.status == 201){
                location.reload()}
                
            })
            .catch(error => {  error, alert("vous n'êtes pas autorisé à supprimer ce contenu!!")})
        },
        getAllPostById(){
            let url = window.location.href;
            let userId=url.split("profil/")[1];
            const self = this;            
            axios.get(`http://localhost:3000/api/post/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
            }
              
              })  
            .then(function (response) {
            const data = response.data;
            self.allPosts = data;
            console.log(self.allPosts);
            for(let i of self.allPosts){
                self.likeNbr[i.postId]=i.likeNumber;
                self.dislikeNbr[i.postId]=i.dislikeNumber;
                let date = i["DATE_FORMAT(postDate, \"%d/%m/%Y\")"];
                self.postDate[i.postId]=date;
            }
            self.isLike();
            self.isDislike()
            })
            .catch(function (error) {
            console.log(error);
            });
        },

        //Partie Commentaire (affichage, création et suppression)

        comment(post_id){
            this.com[post_id]=true;
            const self = this;            
            axios.get(`http://localhost:3000/api/message/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
            }
              
              })  
            .then(function (response) {
            const data = response.data;
            self.allComs[post_id] = data;
            console.log(self.allComs);
            for(let i of self.allComs[post_id]){
                let date = i["DATE_FORMAT(messageDate, \"%d/%m/%Y\")"];
                let time = i.messageTime;
                self.msgDate[i.postId]= date + " à " + time;
            }
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        noComment(post_id){
            this.com[post_id]=false;
        },
        sendComment(post_id){
            let now = new Date();
            let jour= now.getDate();
            let mois=now.getMonth() + 1;
            let annee=now.getFullYear();
            let date = annee+"-"+mois +"-"+jour;
            let heure   = now.getHours();
            let minute  = now.getMinutes();
            let seconde = now.getSeconds();
            let time = heure+":"+minute+":"+seconde;
            if(this.newComment.message !== ""){
                this.newComment.postId=post_id;
                this.newComment.userId=Number(localStorage.userId);
                this.newComment.date=date;
                this.newComment.time=time;
                const comment ={
                    ...this.newComment
                }
                const self = this;
                fetch('http://localhost:3000/api/message/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    mode: 'cors',
                    body: JSON.stringify(comment),
                    })  
                .then(function (response) {
                    if (response.status == 200){
                        self.com[post_id]=false;
                        self.comment(post_id);
                    }
            
                })
                .catch(error => { console.log(error)})
            }
        },
        deleteMessage(messageId){
            const self = this
            axios.delete(`http://localhost:3000/api/message/${messageId}`,{
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data:{
                    userId: Number(self.userId),
                    admin:self.admin,

                }
            })
            .then(res => {
                if (res.status == 201){
                let post_id = res.data.message.postId
                self.comment(post_id);
                }
                
            })
            .catch(error => {  error, alert("vous n'êtes pas autorisé à supprimer ce contenu!!")})
        },

        //Partie like
        isLike(){
            const self = this
                axios.get(`http://localhost:3000/api/like/${this.userId}`, {
                    headers: {                    
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    },    
                })
                .then(function(reponse){                   
                    let data=reponse.data;
                    for(let i in data){
                    self.liked[data[i].post_id]=true;
                    }
                }) 
                .catch(error => { console.log(error)}) 
            },
        isDislike(){
            const self = this
                axios.get(`http://localhost:3000/api/like/dislike/${this.userId}`, {
                    headers: {                    
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    },    
                })
                .then(function(reponse){
                    let data=reponse.data;
                    for(let i in data){
                    self.disliked[data[i].post_id]=true;
                    }
                }) 
                .catch(error => { console.log(error)}) 
            },
        
        like(postid){
            this.post_id =postid;
            this.likeStatus=1;
            this.liked[postid]=true;
            this.disliked[postid]=false;
            this.sendLike()
        },
        likeOff(postid){
            this.post_id =postid;
            this.likeStatus=0;
            this.liked[postid]=false;
            this.disliked[postid]=false;
            this.sendLike()
        },
        dislike(postid){
            this.post_id =postid;
            this.likeStatus=-1;
            this.liked[postid]=false;
            this.disliked[postid]=true;
            this.sendLike()
        },
        dislikeOff(postid){
            this.post_id =postid;
            this.likeStatus=0;
            this.liked[postid]=false;
            this.disliked[postid]=false;
            this.sendLike()
        },    
        sendLike(){
            const id = {
                userId:Number(localStorage.getItem('userId')),
                postId:this.post_id,
                like: this.likeStatus
            }
            
            fetch('http://localhost:3000/api/like/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'cors',
            body: JSON.stringify(id),
            })  
            .then()
            .catch(error => { console.log(error)})
           
        }
    } 
        
    
}





</script>

<style lang="scss">
    
    
</style>