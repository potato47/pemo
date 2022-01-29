<template>
  <div class="md-editor-main">
    <x-row style="
        background: #26282f;
        height: 40px;
        border-bottom: 4px solid #d7d7d8;
        padding: 5px;
      ">
      <router-link to="/">Home</router-link>
    </x-row>
    <x-row style="flex: 1">
      <div style="flex: 1; height: 100%;position: relative;">
        <div
          id="container"
          style="position: absolute;width: 100%;height: 100%;overflow: hidden;"
        >
        </div>
      </div>
      <x-resize direction="v"></x-resize>
      <div style="flex: 1; height: 100%;position: relative;overflow: auto;">
        <div
          id="preview"
          style="position: absolute;width: 100%;height: 100%;padding: 20px;box-sizing: border-box;"
        >
        </div>
      </div>
    </x-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as monaco from 'monaco-editor';
import { marked } from 'marked';

export default defineComponent({
  mounted() {
    const editorInstance = monaco.editor.create(document.getElementById("container")!, {
      value: "# Title",
      theme: "vs-dark",
      language: "markdown",
      fontSize: 14,
      folding: true,
      foldingStrategy: "indentation", // 代码可分小段折叠
      automaticLayout: true, // 自适应布局
      overviewRulerBorder: false, // 不要滚动条的边框
      scrollBeyondLastLine: false, // 取消代码后面一大段空白
      // minimap: {
      //   // 不要小地图
      //   enabled: false,
      // },
    });
    const preview = document.getElementById("preview")!;
    preview.innerHTML = marked(editorInstance.getValue());
    editorInstance.onDidChangeModelContent(() => {
      preview.innerHTML = marked(editorInstance.getValue());
    });
  }
});
</script>

<style>
.md-editor-main {
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
