
<template>
  <div id="uml_wrapper" class="uml_wrapper">
    <img id='image' alt="uml文件预览" :src="imgData" @click="edit" class="uml_preview">
<!--    <iframe id="iframe" v-show="showIFrame" allowfullscreen="true" :src="xmlSrc" :class="iframe_class"></iframe>-->
  </div>
</template>

<script>
import {upload,getFileNameUUID,readURL} from "@/utils/ali_oss";
import {save_uml,load_uml} from "@/utils/api";

/**
 * @description: 这个文件由于iframe是在每次点击时创建并且移入到App节点下
 * 退出时，移除
 * 但是并没有清出内存
 * 所以可能存在多次点击后的性能问题
 * @author: 罗亚硕
 * @date: 2022/8/4
 */
export default {
  name: "UMLEditor",
  data(){
    return{
      showIFrame:false,
      imgData:'data:image/png;base64,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',
      editor : 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json',
      //初始化窗口的数据
      initial : '',
      name : '',
      draft:'',
      iframe:'',
    }
  },
  props: {
    /**
     * @description: 传入用户名，工程id
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    msg: String,
    username:String,
    pro_id:'',
    team_id:'',
    uml_id:'',
  },
  methods:{
    /**
     * @description: 编辑uml
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    edit(){
      console.log('创建iframe')
      this.iframe= document.createElement('iframe');
      this.iframe.setAttribute('id','iframe')
      this.iframe.setAttribute('frameborder', '0');
      this.iframe.style.position='fixed'
      this.iframe.style.left='0px'
      this.iframe.style.top='0px'
      this.iframe.style.height='100%'
      this.iframe.style.width='100%'
      this.iframe.style.zIndex=999
      this.iframe.src=this.editor
      console.log(this.editor)
      document.getElementById('app').appendChild(this.iframe);
      let iframe=document.getElementById('iframe')
      console.log(iframe)
      //从浏览器缓存中加载已经编辑的内容，继续编辑
      this.draft = localStorage.getItem('.draft-' + name);
      //如果缓存不为空，用JSON格式化draft缓存，debug发现draft始终为null
      if (this.draft != null)
      {
        this.draft = JSON.parse(this.draft);
        console.log('继续绘制么？');
        if (!confirm("上次未保存版本\n时间： " + new Date(this.draft.lastModified) + "内容已经缓存。是否继续编辑？"))
        {
          this.draft = null;
        }
      }
      window.addEventListener('message', this.receive);
      this.showIFrame=true
      this.iframe_class='iframe_show'
    },
    /**
     * @description: 页面初始化函数
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    start(){
      name = (window.location.hash.length > 1) ? window.location.hash.substring(1) : 'default';
      var current = localStorage.getItem(name);
      let initial = this.imgData
      if (current != null)
      {
        let entry = JSON.parse(current);
        this.imgData=entry.data
      }
      else
      {
        this.imgData=initial
      }
    },
    /**
     * @description: 消息接受函数
     *     保存：save+export
     *     退出：exit
     *     编辑：autosave
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    receive(evt)
    {
      let image=document.getElementById('image')
      let iframe=document.getElementById('iframe')
      let w=window.innerWidth
      let h=window.innerHeight
      // console.log('一轮receive');
      if (evt.data.length > 0)
      {
        var msg = JSON.parse(evt.data);
        console.log('msg');
        console.log(msg);
        if (msg.event === 'init')
        {
          console.log('执行init');
          //在本地缓存draft不为空的情况下，根据本地本地信息初始化iframe
          if (this.draft != null)
          {
            iframe.contentWindow.postMessage(JSON.stringify({action: 'load',
              autosave: 1, xml: this.draft.xml}), '*');
            iframe.contentWindow.postMessage(JSON.stringify({action: 'status',
              modified: true}), '*');
          }
          else
          {
            iframe.contentWindow.postMessage(JSON.stringify({action: 'load',
              autosave: 1, xmlpng: this.imgData}), '*');
          }
        }
        else if (msg.event === 'export')
        {
          //选择了导出,给image设置背景
          console.log('执行export');
          this.imgData=msg.data
          // image.setAttribute('src', msg.data);
          localStorage.setItem(name, JSON.stringify({lastModified: new Date(), data: msg.data}));
          localStorage.removeItem('.draft-' + name);
          this.draft = null;
          this.close()
        }
        else if (msg.event === 'autosave')
        {
          //自动保存,试验发现在每次修改uml之后被调用
          console.log('执行autosave');
          localStorage.setItem('.draft-' + name, JSON.stringify({lastModified: new Date(), xml: msg.xml}));
        }
        else if (msg.event === 'save')
        {
          //手动保存
          console.log('执行save');
          iframe.contentWindow.postMessage(JSON.stringify({action: 'export',
            format: 'xmlpng', xml: msg.xml, spin: 'Updating page'}), '*');
          localStorage.setItem('.draft-' + name, JSON.stringify({lastModified: new Date(), xml: msg.xml}));
        }
        else if (msg.event === 'exit')
        {
          //退出
          console.log('执行exit');
          localStorage.removeItem('.draft-' + name);
          this.draft = null;
          this.close();
        }
      }
    },
    /**
     * @description: 窗口关闭时的动作
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    close()
    {
      window.removeEventListener('message', this.receive);
      this.showIFrame=false
      this.iframe_class='iframe_close'
      this.saveUML()
      document.getElementById('app').removeChild(iframe);
    },
    /**
     * @description: 从服务器获取初始化内容
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    getUML(){
      let pojo={
        uml_id: this.uml_id
      }
      load_uml(pojo).then((res)=>{
        let data=res.data
        if(data.uml_url){
          let url=data.uml_url
          readURL(url,(xmlData)=>{
            this.imgData=xmlData
          })
          console.log('status_code')
          console.log(data.status_code)
        }
        console.log('后端数据已加载！')
      })
    },
    /**
     * @description: 将uml图的信息存在后端
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    saveUML(){
      let url=upload('testUML',this.imgData)
      console.log(url)
      let pojo={
        username:this.username,
        team_id:this.team_id,
        uml_url:url
      }
      save_uml(pojo).then((res)=>{
        console.log('uml已上传')
        console.log(res.data)
      })
    }
  },
  mounted() {
    this.start()
    window.addEventListener('hashchange', this.start);
  }
}
</script>

<style scoped>
.uml_wrapper{
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
}
.uml_preview{
  top:0;
  left:0;
  width:100%;/*相当父元素的100%是100px*/
  height:100%;/*相当父元素的100%是100px*/
}
</style>