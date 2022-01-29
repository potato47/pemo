<template>
  <div
    class="x-layout"
    :style="{'flex-direction':direction}"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { App } from 'vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'x-layout',
  props: {
    direction: {
      type: String,
      default: 'row'
    }
  },
})
export default class XLayout extends Vue {
  static install(app: App) {
    app.component(XLayout.name, XLayout)
  }
}
</script>

<style>
.x-layout {
  /* border: 10px solid green; */
  display: flex;
  /* flex: 1 1 auto; */
  box-sizing: border-box;
  /* background-color: #863; */
}
</style>
