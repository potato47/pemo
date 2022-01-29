<template>
  <div class="json-editor-main">
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
    <div style="flex: 1; height: 100%; position: relative">
      <div
        id="container"
        style="position: absolute; width: 100%; height: 100%"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as monaco from "monaco-editor";

export default defineComponent({
  mounted() {
    monaco.editor.create(document.getElementById("container")!, {
      value: "{\n\n}",
      theme: "vs-dark",
      language: "json",
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
  }
});
</script>

<style>
.json-editor-main {
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
/* .view-lines  */
</style>
