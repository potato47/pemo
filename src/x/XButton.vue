<template>
  <button @click="handleClick">
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { App } from 'vue';
import { defineComponent } from 'vue'
  // @Options({
  //   emits: ['click']
  // })
export const XButton = defineComponent({

  
  // static install(app: App) {
  //   app.component(XButton.name, XButton)
  // }
  
  
  // handleClick() {
  //   this.$emit('click');
  // }
})
</script>

<style>
</style>
