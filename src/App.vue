<template>
  <Navbar />
  <Homeview />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Homeview from '@/views/HomeView.vue'
export default {
  name: "App",
  components: { Homeview, Navbar }
}
</script>
 
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
