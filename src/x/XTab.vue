<template>
  <div class="x-tab-container">
    <div
      class="x-tab"
      v-for="(tab, i) in tabs"
      v-bind:key="tab.value"
      :class="{'x-tab-active': tab.active}"
      @click="handleTabClick(i)"
    >
      {{tab.name}}
    </div>
  </div>
</template>

<script lang="ts">
import { App } from 'vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: "x-tab",
  props: ['tabs'],
  emits: ['onTabChange']
})
export default class XTab extends Vue {
  static install(app: App) {
    app.component(XTab.name, XTab)
  }

  activeIndex = 0;
  tabs!: any[];

  mounted() {
    this.activeIndex = this.tabs.findIndex(tab => tab.active);
  }

  handleTabClick(i: number) {
    this.tabs[this.activeIndex].active = false;
    this.tabs[i].active = true;
    this.activeIndex = i;
    this.$emit('onTabChange', this.tabs[i].value);
  }
}
</script>

<style>
.x-tab-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.x-tab {
  min-width: 80px;
  text-align: center;
  padding: 5px;
  border: 1px solid #333846;
  cursor: pointer;
  color: #a9adb9;
  background-color: #171920;
}
.x-tab-active {
  /* background-color: #26282f; */
  /* background-color: #366987; */
  background-color: #1e1e1e;
  border-bottom: 0;
  color: white;
}
</style>
