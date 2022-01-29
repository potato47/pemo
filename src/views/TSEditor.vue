<template>
  <div class="ts-editor-main">
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
        <x-tab :tabs="tabs" @onTabChange="onTabChange"></x-tab>
        <div style="flex: 1; width: 100%; position: relative">
          <div id="container" style="position: absolute; width: 100%; height: 100%"></div>
        </div>
      </x-col>
      <x-resize direction="v"></x-resize>
      <x-col style="flex: 1">
        <div id="ts-editor-preview-container">
          <iframe
            width="90%"
            height="90%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
        <!-- <x-resize direction="h"></x-resize>
        <div id="ts-editor-output">
        </div>-->
      </x-col>
    </x-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as monaco from 'monaco-editor';
import * as ts from 'typescript';

interface IEditorFile {
  model: monaco.editor.ITextModel;
  state: monaco.editor.ICodeEditorViewState;
}

type TLang = "ts" | "css" | "html";

const files = {
  ts: {} as IEditorFile,
  css: {} as IEditorFile,
  html: {} as IEditorFile,
};

let iframe: HTMLIFrameElement;

// (window as any).showEvent = function (...args: string[]) {
//   let output = document.getElementById('ts-editor-output') as HTMLDivElement;
//   while (output.childNodes.length > 50) {
//     output.removeChild(output?.firstChild as Node);
//   }
//   output.appendChild(document.createTextNode(args.join(',')));
//   output.appendChild(document.createElement('br'));
//   console.log(...args);
// }

export default defineComponent({
  data() {
    return {
      // editorInstance!: monaco.editor.IStandaloneCodeEditor,
      editorInstance: {} as monaco.editor.IStandaloneCodeEditor,
      previewHtml: '',

      tabs: [
        {
          name: "JS",
          value: "ts",
          active: true,
        },
        {
          name: "CSS",
          value: "css",
        },
        {
          name: "HTML",
          value: "html",
        },
      ]
    }
  },
  mounted() {
    iframe = document.getElementsByTagName('iframe')[0];

    files.ts.model = monaco.editor.createModel(
      'console.log("hi")',
      "typescript"
    );
    files.css.model = monaco.editor.createModel("body {color: white;}", "css");
    files.html.model = monaco.editor.createModel("<h1>1</h1>", "html");
    // files.html.model.onDidChangeContent(() => {
    //   this.previewHtml = files.html.model.getValue();
    // });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true
    });

    // const libUri = 'ts:filename/uu.d.ts';
    // monaco.languages.typescript.typescriptDefaults.addExtraLib(definitions, libUri);
    // monaco.editor.createModel(definitions, 'typescript', monaco.Uri.parse(libUri));
    this.editorInstance = monaco.editor.create(
      document.getElementById("container")!,
      {
        model: files.ts.model,
        theme: "vs-dark",
        language: "javascript",
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
      }
    );

    this.editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // let output = document.getElementById('ts-editor-output') as HTMLDivElement;
      // output.innerHTML = '';
      this.updatePreview(ts.transpile(files.ts.model.getValue()), files.html.model.getValue(), files.css.model.getValue());
    });
    this.updatePreview(ts.transpile(files.ts.model.getValue()), files.html.model.getValue(), files.css.model.getValue());
  },

  methods: {
    onTabChange(value: TLang) {
      const currentState = this.editorInstance.saveViewState()!;

      const currentModel = this.editorInstance.getModel();
      if (currentModel === files.ts.model) {
        files.ts.state = currentState;
      } else if (currentModel === files.css.model) {
        files.css.state = currentState;
      } else if (currentModel === files.html.model) {
        files.html.state = currentState;
      }

      this.editorInstance.setModel(files[value].model);
      this.editorInstance.restoreViewState(files[value].state);
      this.editorInstance.focus();
    },

    updatePreview(js: string, html: string, css: string) {
      const content = iframe.contentDocument || iframe.contentWindow?.document;
      if (!content) return;
      let value = '<script></' + 'script>';
      value = html + `<style>${css}</style>` + value.replace(/(?<=<script>)[\s\S]*(?=<\/script>)/, js);
      // value = value.replace(/(?<=<script>)[\s\S]*(?=<\/script>)/, 'window.uu = parent.uu;\n' + scriptContent).replace(/document./g, 'parent.document.');
      content.open();
      content.write(value);
      content.close();
    }
  }



});
</script>

<style>
.ts-editor-main {
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
#ts-editor-preview-container {
  width: 100%;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
#ts-editor-output {
  width: 100%;
  flex: 1;
  padding: 10px;
  font-family: "Courier New", monospace;
  color: aqua;
  overflow: auto;
}
/* .view-lines  */
</style>
