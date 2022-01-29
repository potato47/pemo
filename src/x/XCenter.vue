<template>
  <div class="x-center">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { App } from "vue";
// import { Options, Vue } from "vue-class-component";

@Options({
  name: "x-center",
})
export default class XCenter extends Vue {
  static install(app: App) {
    app.component(XCenter.name, XCenter);
  }
}
</script>

<style>
.x-center {
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
