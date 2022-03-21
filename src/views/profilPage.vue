<template>
    <div id="profilPage">
        <div>
            <img src="" alt="photo de profil">
            <p>Nom</p>
            <p>Prénom</p>

            <!--a rajouter la modification du profil si le profil de l'utilisateur-->
            
        </div>
        <div >
            <div v-for="n in 10" :key="n" id="profilPost"><!--les post de l'utilisateur-->
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
</style>

<script>
    import post from '@/components/post.vue'

    export default {
        name: 'postMeme',
        components:{
            post
        },
        
    }

    
</script>