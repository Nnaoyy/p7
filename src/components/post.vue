<template>

<!--a changer avec les données de la BDD -->

    <div v-for="n in 10" :key="n" id="post">
        <div id="profil"><!-- qui publie-->
           <img src="" alt="photo profil miniature">
           <p>Nom Prénom</p>  
        </div>
        <div id="meme"><!--meme -->
            <h4>{{n}}</h4>
            <img src="../assets/meme.jpg" >
            <div>
                <span>
                <button>like</button>
                <button>dislike</button>
                </span>
                <button>commentaire</button>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    name: 'postMeme'
}
</script>

<style lang="scss">
    #post{
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