<template>
  <div class="home-main">
    <router-link to="/ts" class="home-item">
      TypeScript Playground
    </router-link>
    <router-link to="/image" class="home-item">
      Image Editor
    </router-link>
    <router-link to="/json" class="home-item">
      JSON Editor
    </router-link>
    <router-link to="/markdown" class="home-item">
      Markdown Editor
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style>
.home-main {
  height: 100%;
  /* background-color: gray; */
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  flex-basis: auto;
  overflow: none;
  box-sizing: border-box;
  color: #dadde7;
  /* padding: 50px; */
}
.home-item {
  width: 200px;
  height: 200px;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px tomato;
}
</style>
