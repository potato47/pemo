<template>
  <span>{{value}}</span>
</template>

<script lang="ts">
import { App } from 'vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'x-label',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
export default class XLabel extends Vue {
  static install(app: App) {
    app.component(XLabel.name, XLabel)
  }
}
</script>

<style>
</style>
