<template>
  <div class="x-row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { App } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "x-row",
})
export default class XRow extends Vue {
  static install(app: App) {
    app.component(XRow.name, XRow);
  }
}
</script>

<style>
.x-row {
  width: 100%;
  /* min-height: 50px; */
  /* padding: 5px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}
</style>
