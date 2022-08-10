<template>
  <div class="editor" style="height: calc(100vh - 4rem - 100px)">
    <div style="display: flex; align-items: baseline">
      <span style="font-weight: lighter; font-size: 40px; color: #000000"
        >{{ creator }}的项目文档</span
      >
      <span style="font-weight: lighter; font-size: 30px; color: #26476d"
        >《{{ file_name }}》</span
      >
      <span style="position: absolute; right: 5rem; top: 40px">
        <el-button type="primary" @click="this.getHTML">导出为Html</el-button>
        <el-button type="primary" @click="this.getMarkdown"
          >导出为Markdown</el-button
        >
        <el-button type="primary" @click="this.getPDF">导出为PDF</el-button>
        <el-button type="primary" @click="this.getWord">导出为Word</el-button>
        <el-button type="primary" @click="this.exit">退出编辑</el-button>
      </span>
    </div>
    <hr style="margin: 5px; margin-bottom: 20px" />
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
      class="bubble-menu"
    >
      <div
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active-bubble': editor.isActive('bold') }"
      >
        粗体
      </div>
      <el-divider direction="vertical"></el-divider>
      <div
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active-bubble': editor.isActive('italic') }"
      >
        斜体
      </div>
      <el-divider direction="vertical"></el-divider>
      <div
        @click="editor.chain().focus().toggleHighlight().run()"
        :class="{ 'is-active-bubble': editor.isActive('highlight') }"
      >
        高亮
      </div>
    </bubble-menu>
    <div class="menubar">
      <span v-for="actionName in activeButtons" :key="actionName">
        <button
          v-if="actionName === 'bold'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <icon name="bold" />
        </button>
        <button
          v-if="actionName === 'italic'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <icon name="italic" />
        </button>

        <button
          v-if="actionName === 'strike'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <icon name="strike" />
        </button>

        <button
          v-if="actionName === 'underline'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <icon name="underline" />
        </button>

        <button
          v-if="actionName === 'code'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('code') }"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <icon name="code" />
        </button>

        <button
          v-if="actionName === 'h1'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </button>

        <button
          v-if="actionName === 'h2'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </button>

        <button
          v-if="actionName === 'h3'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </button>

        <button
          v-if="actionName === 'bulletList'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <icon name="ul" />
        </button>

        <button
          v-if="actionName === 'orderedList'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <icon name="ol" />
        </button>

        <button
          v-if="actionName === 'blockquote'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <icon name="quote" />
        </button>

        <button
          v-if="actionName === 'codeBlock'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          <icon name="code" />
        </button>

        <button
          v-if="actionName === 'horizontalRule'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('horizontalRule') }"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <icon name="hr" />
        </button>
        <button
          v-if="actionName === 'highlight'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('highlight') }"
          @click="editor.commands.toggleHighlight()"
        >
          <icon name="highlight" />
        </button>
        <button
          v-if="actionName === 'link'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('link') }"
          @click="setLink"
        >
          <icon name="link" />
        </button>

        <el-popover
          placement="top"
          title="输入表格规格"
          :width="250"
          trigger="hover"
        >
          <template #reference>
            <button
              v-if="actionName === 'table'"
              class="menubar__button"
              @click="setTable"
            >
              <icon name="table" />
            </button>
          </template>
          <div>
            <span>行数：</span>
            <el-input-number v-model="table_row"></el-input-number>
          </div>
          <div>
            <span>列数：</span>
            <el-input-number v-model="table_col"></el-input-number>
          </div>
        </el-popover>

        <button
          v-if="actionName === 'delete_table'"
          class="menubar__button"
          @click="editor.chain().focus().deleteTable().run()"
        >
          <icon name="delete_table" />
        </button>
        <button
          v-if="actionName === 'undo'"
          class="menubar__button"
          @click="editor.chain().focus().undo().run()"
        >
          <icon name="undo" />
        </button>

        <button
          v-if="actionName === 'redo'"
          class="menubar__button"
          @click="editor.chain().focus().redo().run()"
        >
          <icon name="redo" />
        </button>

        <button
          v-if="actionName === 'exit'"
          class="menubar__button"
          @click="exit"
        >
          <icon name="exitEdit" />
        </button>
      </span>
      <span style="position: fixed; left: 60rem">
        字数统计:{{ this.editor.getText().length }}
      </span>
    </div>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Icon from "./Icon";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import Gapcursor from "@tiptap/extension-gapcursor";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import { upload, readURL } from "@/utils/ali_oss";
import { load_doc, save_doc } from "@/utils/api";
import docModel from "@/assets/fileModels/docModel";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TurndownService from "turndown/lib/turndown.es.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import saveAs from "file-saver";
const turndownService = new TurndownService();
const html2pdf = require("html2pdf.js");

export default {
  name: "DocEditor",
  components: {
    EditorContent,
    Icon,
    BubbleMenu,
  },
  /**
   * @description: 需要给编辑传入文档doc_id来确定当前文档有多少人在编辑
   * @author: 罗亚硕
   * @date: 2022/8/5
   */
  data() {
    return {
      file_name: "",
      creator: "",
      doc_id: "",
      room_id: "",
      username: "",
      project_id: "",
      initialContent: "",
      activeButtons: [
        "bold",
        "italic",
        "strike",
        "underline",
        "code",
        "h1",
        "h2",
        "h3",
        "bulletList",
        "orderedList",
        "blockquote",
        "codeBlock",
        "horizontalRule",
        "highlight",
        "link",
        "table",
        "delete_table",
        "undo",
        "redo",
        "save",
        "exit",
      ],
      editor: null,
      provider: null,
      html: "",
      json: "",
      table_row: "",
      table_col: "",
      model_id: -1, //-1表示没有使用模板，模板id从0开始
      docModel: docModel,
      fromPath: "",
      fromQuery: "",
    };
  },
  emits: ["update"],

  created() {
    //接受参数
    this.doc_id = this.$route.query.doc_id;
    this.file_name = this.$route.query.file_name;
    this.creator = this.$route.query.creator;
    if (this.$route.query.model_id != null) {
      this.model_id = this.$route.query.model_id;
    }
    this.project_id = this.$route.query.project_id;
    this.username = this.$store.state.username;
    this.$store.commit("addNewArticle", this.doc_id);
    if (this.$route.query.doc_url) {
      let url = this.$route.query.doc_url;
      console.log(url);
      readURL(url, (htmlData) => {
        this.html = htmlData;
        console.log(this.html);
        this.editor.commands.setContent(this.html);
      });
    }
    let r=Math.floor(Math.random()*256);
    let g=Math.floor(Math.random()*256);
    let b=Math.floor(Math.random()*256);
    let color="rgba("+r+','+g+','+b+',0.7'+")"
    this.editor = new Editor({
      extensions: [
        CollaborationCursor.configure({
          provider: this.$store.state.provider,
          user: {
            name: this.username,
            color: color,
          },
        }),

        StarterKit.configure({
          // The Collaboration extension comes with its own history handling
          history: false,
          highlight: { multicolor: true },
        }),
        // Register the document with Tiptap
        Collaboration.configure({
          document: this.$store.state.ydoc,
          field: this.doc_id,
        }),
        Placeholder.configure({
          placeholder: "请输入",
        }),
        Underline,
        Typography,
        Highlight.configure({
          multicolor: true,
        }),
        Link.configure({
          openOnClick: true,
        }),
        Gapcursor,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      ],
    });
    this.editor.on("update", () => {
      this.html = this.editor.getHTML();
      this.json = this.editor.getJSON();
    });

    //使用模板

    console.log(this.model_id);
    if (this.model_id !== -1) {
      this.html = this.docModel[this.model_id].html;

      this.editor.commands.setContent(this.html);
    }
  },
  /**
   * @description: 数据传输部分还没写完
   * @author: 罗亚硕
   * @date: 2022/8/5
   */
  methods: {
    getWord() {
      let htmlStr = this.html;
      let page = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${this.html}
        </body></html>`;
      // console.log(page);return
      saveAs(
        htmlDocx.asBlob(page, {
          orientation: "landscape", //跨域设置
        }),
        //文件名
        this.file_name + ".doc"
      );
    },
    getMarkdown() {
      let markdown = turndownService.turndown(this.html);
      console.log(markdown);
      let blob = new Blob([markdown], { type: "text/plain;charset=utf-8" });
      saveAs(blob, this.file_name + ".md");
    },
    getHTML() {
      let blob = new Blob([this.html], { type: "text/plain;charset=utf-8" });
      saveAs(blob, this.file_name + ".html");
    },
    getPDF() {
      var worker = html2pdf()
        .from(this.html)
        .save(this.file_name + ".pdf");
      console.log("worker", worker);
    },
    setTable() {
      console.log(this.table_row, this.table_col);
      this.editor.commands.insertTable({
        rows: this.table_row,
        cols: this.table_col,
        withHeaderRow: true,
      });
    },
    setLink() {
      const previousUrl = this.editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    save() {
      let url = upload("docs", this.html);
      console.log(url);
      let pojo = {
        doc_url: url,
        username: this.username,
        doc_id: this.doc_id,
        project_id: this.project_id,
      };
      save_doc(pojo).then((res) => {
        console.log(res.data);
      });
    },
    exit() {
      //退出前先保存
      this.save();
      this.$router.push({
        path: this.fromPath,
        query: this.fromQuery,
      });
    },
  },
  mounted() {},
  beforeUnmount() {
    this.editor.destroy();
  },
  beforeRouteEnter(to, from, next) {
    console.log("in uml from", from);
    next((vm) => {
      vm.fromPath = from.fullPath;
      vm.fromQuery = from.query;
    });
  },
  beforeRouteLeave(to, from) {
    this.save();
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/projectDetail.scss";
@import "src/assets/scss/titap";
/* Basic editor styles */
.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
  > * + * {
    margin-top: 0.75em;
  }
  code {
    font-size: 0.8rem;
    color: yellowgreen;
    background: #282626;
    //padding: 0.25em;
    //border-radius: 0.25em;
    ////background-color: rgba(#616161, 0.1);
    //color: #e72212;
    //box-decoration-break: clone;
  }
  pre {
    background: #282626;
  }
}
/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
  z-index: 999;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: 1.4em;
  left: 1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
  z-index: 999;
}
.el-button {
  display: inline-flex;
  background: transparent;
  border: 0;
  color: $color-white;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.tool-span {
  align-self: flex-end;
}

.bubble-menu {
  display: flex;
  flex-direction: row;
  border: solid;
  border-radius: 0.2rem;
  transition: 0.5s;
  div {
    font-size: 10px;
    margin-left: 0.05rem;
    margin-right: 0.05rem;
    //padding: 0.1rem;
    color: #282626;
    transition: 0.5s;
  }
}
.is-active-bubble {
  background: #c2e9fb;
  color: #26476d;
}
.el-button {
  span {
    color: black;
  }
}
</style>
