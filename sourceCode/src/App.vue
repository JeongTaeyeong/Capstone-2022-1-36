<template>
    <div id="app">
      <nav-bar></nav-bar>
      <div id="main-background">
        <transition name="fade" appear>
          <router-view></router-view>
        </transition>
      </div>
      <main-footer></main-footer>
    </div>
</template>

<script>
import NavBar from './commons/NavBar.vue'
import MainFooter from './commons/Footer.vue'

export default {
  name: 'app',
  components: {
    'nav-bar': NavBar,
    'main-footer': MainFooter,
  },
}
</script>

<style scoped>
#main-background {
  background-color: #fdfdfd;
}
</style>