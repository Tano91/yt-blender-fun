<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from './components/Footer.vue';
import Homeview from '@/views/HomeView.vue'
export default {
  name: "App",
  components: { Homeview, Navbar, Footer }
}
</script>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;


}
</style>
