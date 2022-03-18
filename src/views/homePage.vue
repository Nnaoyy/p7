<template>
    <nav>
        <img src="../assets/icon-left-font-monochrome-black.svg"  >
        <a href="#">profil</a>
        <input type="search" name="search" placeholder="Recherche"/>
        <router-link to="/">Déconnexion</router-link> 
    </nav>
</template>

<style lang="scss">
nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
    
}
img{
    height: 30px;
}
</style>
