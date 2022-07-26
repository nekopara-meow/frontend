<template>
  <div class="editor">
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
            @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <icon name="hr" />
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
      </span>
      <span>
         <button type="button" class="menubar__button" @click="save">
           <icon name="save" />
         </button>
      </span>
      <span>
         <button type="button" class="menubar__button" @click="exit">
           <icon name="exitEdit" />
         </button>
      </span>
    </div>
      <editor-content class="editor__content" :editor="editor" />

  </div>
</template>

<script>
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Icon from '../file_componets/Icon';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import {upload,readURL} from "@/utils/ali_oss";
import {load_doc,save_doc} from "@/utils/api";

export default {
  components: {
    EditorContent,
    Icon,
  },
  /**
   * @description: 需要给编辑传入文档doc_id来确定当前文档有多少人在编辑
   * @author: 罗亚硕
   * @date: 2022/8/5
   */
  data() {
    return {
      doc_id:'',
      room_id:'',
      username:'',
      project_id:'',
      initialContent: '文件编辑器',
      activeButtons:[
          'bold',
          'italic',
          'strike',
          'underline',
          'code',
          'h1',
          'h2',
          'h3',
          'bulletList',
          'orderedList',
          'blockquote',
          'codeBlock',
          'horizontalRule',
          'undo',
          'redo',],
      editor: null,
      provider: null,
      html: '',
      json: '',
    }
  },
  emits: ['update'],
  created() {
    //接受参数
    this.doc_id=this.$route.params.doc_id
    this.project_id=this.$route.params.project_id
    this.username=this.$route.params.username
    load_doc({
      doc_id:this.doc_id,
      username:this.username,
      project_id: this.project_id
    }).then((res)=>{
      //不是新建文档需要初始化客户
      if(res.data.doc_url){
        let url=res.data.doc_url
        readURL(url,(htmlData)=>{
          this.html=htmlData
        })
      }
    }).then(()=>{
      if(this.html){
        this.initialContent=''
      }
// A new Y document
      const ydoc = new Y.Doc()
// Registered with a WebRTC provider
      this.provider = new WebrtcProvider('example-document', ydoc)
      this.editor = new Editor({
        extensions: [
          CollaborationCursor.configure({
            provider: this.provider,
            user: {
              name: 'Other Editor',
              color: '#f783ac',
            },
          }),
          StarterKit.configure({
            // The Collaboration extension comes with its own history handling
            history: false,
          }),
          // Register the document with Tiptap
          Collaboration.configure({
            document: ydoc,
          }),
          Placeholder.configure({
            placeholder: this.initialContent,
          }),
          Document,
          Text,
          Underline,
          Paragraph,
        ],
      })
      this.editor.on('update', () => {
        this.html = this.editor.getHTML();
        this.json = this.editor.getJSON();
        // this.$emit('update', this.html);
      })
      //继承存储的内容
      if(this.html){
        this.editor.commands.setContent('<p>未作任何保存</p>')
      }
    })

  },
  /**
   * @description: 数据传输部分还没写完
   * @author: 罗亚硕
   * @date: 2022/8/5
   */
  methods:{
    save(){
      let url=upload('docs',this.html)
      let pojo={
        doc_url:url,
        username:this.username,
        doc_id:this.doc_id,
        project_id:this.project_id,
      }
      save_doc(pojo).then((res)=>{
        console.log(res.data)
      })
    },
    exit(){
      //不做更改，返回页面
      this.$router.go(-1)
    }
  },
  beforeUnmount() {
    this.editor.destroy()
    this.provider.destroy()
  },
}
</script>

<style lang="scss">
@import "../../assets/scss/titap";
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
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
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}
.el-button{
  display: inline-flex;
  background: transparent;
  border: 0;
  color: $color-white;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.tool-span{
  align-self: flex-end;
}
</style>