<template>
  <div>

    <h1>App base</h1>

    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/login">Login</router-link> | 
      <router-link to="/register">Register</router-link> | 
      <button>Logout</button>


    </nav>


    <router-view></router-view>
  <!--
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  -->


  </div>


</template>


<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
