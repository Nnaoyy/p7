<template>

<!--a changer avec les données de la BDD -->

    <div  >
        <div id="profil"><!-- qui publie-->
           <img src="" alt="photo profil miniature">
           <p>Nom Prénom</p>  
        </div>
        <div id="meme"><!--meme -->
            <h4>truc</h4>
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
    name: 'postsMeme'
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