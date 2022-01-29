<template>
  <div class="x-col">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { App } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "x-col",
})
export default class XCol extends Vue {
  static install(app: App) {
    app.component(XCol.name, XCol);
  }
}
</script>

<style>
.x-col {
  height: 100%;
  /* padding: 5px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}
</style>
