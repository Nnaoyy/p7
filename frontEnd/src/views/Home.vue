<template>
<div>
    <div ><!-- pour poster qqch-->
        <post />
    </div>
    <div ><!-- tout les posts-->
        <posts />
    </div>
</div>
</template>


<style lang="scss">
#menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
    
}
img{
    height: 30px;
}
</style>
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
        }
    }

    
</script>