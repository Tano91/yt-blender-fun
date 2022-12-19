<template>
    <header>
        <div class="header-container">
            <router-link :to="{ name: 'home' }">
                <h1>YTBlender</h1>
            </router-link>
        </div>
        <nav>
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{}">About</router-link>

        </nav>
    </header>

</template>


<script>




export default {

}



</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 66%;
    margin: 0 auto;
    padding: 10px;
}

header h1 {
    color: #dfdfdf;
}


header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
}

header a.router-link-active {
    color: #cd1a1a;
    font-weight: bold;
}
</style>
