<template>
  <div class="image-editor-main">
    <x-row
      style="
        background: #26282f;
        height: 40px;
        border-bottom: 4px solid #d7d7d8;
        padding: 5px;
      "
    >
      <router-link to="/">Home</router-link>
    </x-row>
    <x-row style="flex: 1">
      <x-col style="flex: 1">
        <x-center>1</x-center>
        <x-resize direction="h"></x-resize>
        <x-center>
          <x-label value="12"></x-label>
        </x-center>
      </x-col>
      <x-resize direction="v"></x-resize>
      <div style="flex: 3; height: 100%;position: relative;">
        <div id="container" style="position: absolute;width: 100%;height: 100%;"></div>
      </div>
      <x-resize direction="v"></x-resize>
      <x-col style="flex: 1">
        <x-row style="padding: 5px">
          <x-label value="X" style="flex: 1"></x-label>
          <input type="number" value="50" style="flex: 2; background: #161921; color: #dadde7" />
        </x-row>
        <x-row style="padding: 5px">
          <x-label value="Y" style="flex: 1"></x-label>
          <input type="number" value="50" style="flex: 2; background: #161921; color: #dadde7" />
        </x-row>
        <x-row style="padding: 5px">
          <x-label value="Width" style="flex: 1"></x-label>
          <input type="number" value="200" style="flex: 2; background: #161921; color: #dadde7" />
        </x-row>
        <x-row style="padding: 5px">
          <x-label value="Height" style="flex: 1"></x-label>
          <input type="number" value="100" style="flex: 2; background: #161921; color: #dadde7" />
        </x-row>
        <x-row style="padding: 5px">
          <x-label value="Color" style="flex: 1"></x-label>
          <input type="color" value="#009900" style="flex: 2; background: #161921" />
        </x-row>
      </x-col>
    </x-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as monaco from "monaco-editor";
export default defineComponent({
  data() {
    return {
      title: '1'
    }
  },
  mounted() {
    monaco.editor.create(document.getElementById("container")!, {
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
        "\n"
      ),
      theme: 'vs-dark',
      language: "typescript",
      fontSize: 14,
      folding: true,
      foldingStrategy: "indentation", // 代码可分小段折叠
      automaticLayout: true, // 自适应布局
      overviewRulerBorder: false, // 不要滚动条的边框
      scrollBeyondLastLine: false, // 取消代码后面一大段空白
      minimap: {
        // 不要小地图
        enabled: false,
      },
    });
  },
  methods: {
    handleClick() {
      this.title = new Date().toLocaleDateString();
    }
  }
})
</script>

<style>
.image-editor-main {
  height: 100%;
  /* background-color: gray; */
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-basis: auto;
  overflow: none;
  box-sizing: border-box;
  color: #dadde7;
  /* padding: 10px; */
}
</style>
