<template>
<div >
    <div class="test"><div class="chargement"></div></div>
    <div class="padTop"><!-- pour poster qqch-->
        <post />
    </div>
    <div id="posts"><!-- tout les posts-->
        <posts />
    </div>
</div>
</template>


<script>
    import posts from '@/components/posts.vue'
    import post from '@/components/post.vue'

    export default {
        name: 'HomeView',
        components:{
            posts,
            post
        },
        beforeMounted(){
            if (localStorage.getItem('token') == 'null'){
                this.$store.commit('menu_off');
                this.$router.push('/');
            }
        },
        
    }

    
</script>