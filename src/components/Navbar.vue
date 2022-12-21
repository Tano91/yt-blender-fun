<template>
    <header>
        <div class="header-container">
            <router-link :to="{ name: 'home' }">
                <h1>YTBlender</h1>
            </router-link>
        </div>
        <nav>
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{ name: 'about' }">About</router-link>

        </nav>
    </header>

</template>


<script>




export default {

}



</script>

<style scoped>
header {
    border-bottom: 1px solid #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 75%;
    margin: 0 auto;
    padding: 10px;
    padding-top: 0;
}

@media (max-width: 800px) {
    header {

        max-width: 100%;
    }
}

header h1 {
    color: #cd1a1a;
    font-size: 1.3em;
    margin-top: 0;

}


header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
}

header a:hover {
    color: #cd1a1a;
}


header a.router-link-active {
    color: #cd1a1a;
    font-weight: bold;

}
</style>
