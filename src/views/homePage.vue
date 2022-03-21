<template>
    
    <post />
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
    import post from '@/components/post.vue'

    export default {
        name: 'postMeme',
        components:{
            post
        },
        
    }

    
</script>