<template>
<div class="file-pre-container"  >
  <el-tooltip
      :content="tip"
      raw-content
      placement="left-end"
  >  <img :src="imgData" @click="openFile" @contextmenu.prevent.native="openMenu($event)"/>
  </el-tooltip>

  <div class="file-info bluelight">
    <div>{{ fileName }}</div>
  </div>
  <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
    <li @click="deleteFile" v-if="!this.isDel">删除</li>
    <li @click="renameFile" v-if="!this.isDel">重命名</li>
    <li @click="recoverFile" v-if="this.isDel">恢复</li>
    <li @click="completeDelFile" v-if="this.isDel">彻底删除</li>
  </ul>
  <!--新文件对话框-->
  <el-dialog v-model="dialogFormVisible" :title="createFileTitle">
    <el-form :model="fileInitial">
      <el-form-item label="创建的文件名" label-width="140px">
        <el-input v-model="fileInitial.name" autocomplete="off"
                  type="text"
                  placeholder="请输入文件名"
        />
      </el-form-item>
      <el-form-item label="选择文件模板" v-if="this.file_type===1" label-width="140px">
        <el-select  v-model="doc_model_id" class="m-1" placeholder="不选择模板" size="large">
          <el-option
              v-for="item in docModel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false;this.fileInitial.name=null">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;this.handle()"
        >Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <!--修改文件名对话框-->
  <el-dialog v-model="dialogFormVisible1" title="文件重命名">
    <el-form :model="fileRename">
      <el-form-item label="重命名文件" label-width="140px">
        <el-input v-model="fileRename.rename" autocomplete="off" :placeholder="this.file_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false;">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false;file_name=fileRename.rename;doFileRename()"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!--新建axure对话框-->
  <el-dialog v-model="dialogFormVisible2" :title=createFileTitle>
    <el-form :model="newAxure">
      <el-form-item label="创建的文件名" label-width="140px">
        <el-input v-model="newAxure.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新建画布高度" label-width="140px">
        <el-input-number v-model="newAxure.height"
                         controls-position="right"
                         class="mx-4"
                         :min="1" :step="50"
                         :max="1000"
        />
      </el-form-item>

      <el-form-item label="新建画布宽度" label-width="140px">
        <el-input-number v-model="newAxure.width"
                         controls-position="right"
                         class="mx-4"
                         :min="1" :step="50"
                         :max="1000"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false;">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false;this.createAxure()"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>
import {readURL} from "@/utils/ali_oss";
import {
  completelyDelFileByIn,
  create_axure,
  create_doc,
  create_uml,
  deleteFileById,
  recoverFileById,
  renameFileById
} from "@/utils/api";
import docModel from "@/assets/fileModels/docModel";
export default {
  name: "filePreview",
  data(){
    return{
      newFileImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAu5JREFUeF7tm79v00AUx7/nKmVjCGZDKhIOA5HAXdgqwdD/AFUMFRIMCEbYmGgnNhiBBQYGEOJ/oFJnVBcpDI0rtRIbJgMbrcghJ3GV2IntZ9/Fl+RlzZ3v3uf9uPd8fgIL/hMLLj8YAFtABoHr7folIZfWYcmbAlgHcGWa0DwnGLFSt21veY1gS9UeUl3AbdsvIcQ9QF5QtSD1OQkAvi0hsa0KwkQAbriQAb+xAMJ9KYIwFsCqb9+VwEcD5MdEAIogJAA0W+frtXO1b4C4bDwABRASAFzffgjgrQnCh3tItYBokyXcIQng0P4Aic2ZAlDCEsYBOILEyswBKAhhnAsYEf0jBeRygWFtEd1h/gAQLWE+ARAgzC+AnBBmDoDq4MwA4kRNqQGifYlat7m30vmhWvNnzzcdQFj0ANjxGsGODgjTdwGJbbHc/dyLUSfWBgSe6xBsUh4RX6sKALcjbbpt+xYEvi4UAHJmV5JOfL3KLYABxN/xaX7zxBYQA84uECMw9VOAYwDHgNhFBwdBvfcPfApoPwUGub3Oii0M3KvH9WtFagf9FiBxltuXzFozpxepHbQD0F2vD1PpWcGp1cokNTRAOwDd9XokS0/7QFg9kspn/QAo6sh71UV8ZtpwBqD9FCBqi1NhToU5FR796IlrAa4FtF7H8zHIx+Bo0K38neBw7VAktyemHYmPrCoHENUOg42Qc/vZB0CVoOR444JgSXnI0xmAaacAWYUlJ7AFsAUYlgeUtGjydHaBAi7gT7sviKzW/BMOPSdw0oYnbodv+PZrATzKv4a5IyXwZt8JHtMAHFy8Lyz5zlyx8u9MdsWD/au/3pMAhG1ylljyquwUyy9iqmi/u/Kf+73R+UkCEA7ut8vhiZqNVPQUiVdeI3iatbrxbXNZAkz6P+v4i+alNk722+fkC1M6yLJhyCMB8WzPCT5lj+2PyGye7rfRLd+BwBqANZP6iQYSHAPYhcTu6d+TL63mn05e4cNx/wHxa+RQfVXGvQAAAABJRU5ErkJggg==',
      umlFileImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABYJJREFUeF7tm9tvG0UUxr9Z22s7a6dOcS8J6iWXpiCBcEQLLRUSPNAkRUW59RLeEP8ALW0JFKmpVInCC32FJ3hBQtRpxaUxSEg8kJiWiCoSEhKqQgttXBpCnHh9XduDxo7ttDTe2bXddRrPo/ecM+f77Zmj8e4OwSofZJXrRw1ArQJ0EBi4JO+FgA4KsgugL4DCpSOMFpdQIDw7C0qnU6BfXz7Q/J4W52K2mpZAny/cSCg+Auj+ciXAG2cmMoeZSDBjbjOLk1cHt3t4fcsCoO+b0DARyKlyTKonxlIAWQjWO1cH2zfoibXUh6sCei7MuUw2y1ypk5Xify8AFstutgZ+GWxvKiUuF4ABn/whpXijlIlK9b0fABZTEm03Jw5t26Q3viqA/lG5E4BP7wTl8lsOQAaCpe7GxOHWrXrmUgVg9NrPiSoGgNk4rdLUlYMtrVohqALoH5XZ3WdVYOhQA8CSc1jqrv98uLVZS6IcAELzAKnXErQStjwAssvB/ufE4bYtvDlwAJApb7BK2kWTcfwRnOaaQjLbbk4M8jXGFQOAKZ8KTiOWjHNBcFol35WDLd1qxisKQCyZwFTwlpqm/PUNDvdrP/Q2flLMYUUBYEKS6RRuy7NgS0JJJ4vCqBelycuHWopumVccAO7bnzEk495uac9DVQGaABAie7sk5+oFAMDb7Sha5Q/5EqgBqFWAoUvg9DM2zCcovrim4C85ral/7d5oRk+zGaKJ4MiPUU2+S40NA3CgzYJDbWImlxuhJM5N8kPYsd6EEx02CIsd6vNriQxEPcMwAJIpik9fcudz5oXgcZtwvMMKq6nQn1//fhbzik2PfuN6QIqmsa1exgd7GrkhPLGWiRchWYSMj5KmGBoLYEp2wkSyv2kdhlUASzSeUvC4K8oFYbsrK95lzQqNJNMYGg/gekiCaLJo1Z23NxQAL4TWNQKOe0S47aZM4vPxFIbGb2M66oBFMOsWzxwNB6AGgTW6Yx0iGuuy4v+JJvG2/2/MxJwwC9nfShlVAaAYBIEQbHJkhQbCCt7x30FQqde95u+FVTUAloOQS/hGKIGT/juIpFxgUMo1qgrAchCuzcfxrn8GClwgZX5hXXUAdq434U2PFebcLmfxVvPuE7RWRlUB6HCbcNRjhd18/xKvBISqAfDkIyYcfUqEUyxsaE6MBSAQirPPFV7vlRtCVQB4rCErfq3tbvG/Be2glMLjjuHMLv4do5ZlYDiAtjUCjnpErF/c5LDk2Z1n4q2LOzz2gHPnugSGn92Y11auSjAUwFZnVnyTVNjQ3Cs+pziixLCnUcHJHeWFYBiAepFgeKeIzc7CVnY58TkIYSWGF5uSOPF04bsHVglnJhKYi+t7QWUYgL4WAa+22/MlrSY+ZygnoujcnMIRTwHCZ79HMTKl7YFKLp5hAFJpGeeeb8j8pf3413/vWvNqTSyUiGD/FoqBbQ2QlTSOjQVhFhxqbve9bhgAls2t0EwmKXedK9/weFUsxMNYSIQzO8NHnet43f5nZygA3VmX0bEGoPZipPZmqPZqrFhLUX3y0D9aHZ/I6O2LtSZYa4KlNkGfPPcAPofXW+HF/QiC3i5HQ2k9wBe+AEp7KpNhhaMSctHbJfWWBGDAJ79FKc5WONWKhCcEQ+e7HO+XBuCSvJcSfFuRDCsclFB0nt/n+K4kAMy5fzT8pRGnRErjQ77ydkuvqMVQ3QewANmjMpTvO1W1GR/QdUpI00iXFFCbjgtABoLBR2bUhCy9TtP09MjLzmEeH24ALBg7OmO2W04ZfXpkOWGE4Fwyqpy+2NuQPV3FMTQByMVjp0homu4mQubY3G7jPqenCwDx0zT9iQjE7+12aG7WugBwgF0xJjUAK+ZWVSjRVV8B/wFj2atf2MEJ7AAAAABJRU5ErkJggg==',
      docFileImg:'data:image/png;base64,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',
      axureFileImg:'data:image/png;base64,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',
      umlData:null,
      username:String,//测试用
      dialogFormVisible:false,
      fileInitial:{
        name:null,
        model:null,
      },
      fileRename:{
        rename:'新文件',
      },
      newAxure:{
        height:null,
        width: null,
        name:null,
      },
      visible:false,
      left:0,
      top:-50,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      doc_model_id:'',
      docModel:docModel,
      creating_file_name:'',
    }
  },
  props:{
    isNew:{
      type:Boolean,
      default:false,
    },
    isDel:{
      type:Boolean,
      default:false,
    },
    file_id:'',
    project_id:'',
    creator:'',
    file_content:'',
    file_type:'',
    //0-UML,1-axure,2-doc
    file_name:'',
    update_time:Date,
    name_url:'',
    height:'',
    width:'',

  },
  computed:{

    tip(){
      if(this.isNew) return '点击图标，新建文件'
      console.log('updateTime',this.update_time,this.fileName)
      let timestr=new Date(this.update_time).toLocaleDateString()+' '+new Date(this.update_time).toLocaleTimeString()
      console.log('timestr',timestr)
      if (this.update_time != undefined) {
        timestr= (
            "修改于:" +
            this.timestampFormat(new Date(this.update_time).valueOf() / 1000)
        );
      }
      let typestr='文件类型：'
      switch (this.file_type){
        case 0:typestr+='UML'
              break
        case 1:typestr+='文档文件'
          break
        case 2:typestr+='设计原型'
          break
      }
      return '文件名：'+this.file_name+'<br/>'+typestr+'<br/>'+timestr
      +'<br/>'+'创建人:'+this.creator
    },
    fileName(){
      if(this.isNew) return '新建文件'
      let ex='.uml'
      switch (this.file_type){
        case 0:ex='.uml';break
        case 1:ex='.doc';break
        case 2:ex='.axu';break
      }
      return this.file_name+ex
    },
    /**
     * @description: 出现错误就返回新建图片的标签
     * @author: 罗亚硕
     * @date: 2022/8/7
     */
    imgData(){
      if(this.file_type===null||this.isNew){
        return this.newFileImg
      }
      if(this.file_type===0){
        return this.umlFinalImg
      }
      else if(this.file_type===1){
        return this.docFileImg
      }
      else if(this.file_type===2){

        return this.axureFileImg
      }
      else {
        console.log('类型错误')
        return this.newFileImg
      }
    },
    /**
     * @description: 获得数据库中的uml文件数据
     * @author: 罗亚硕
     * @date: 2022/8/7
     */
    umlFinalImg(){
      if(!this.file_content){
        return this.umlFileImg
      }
      let url = this.file_content;
      readURL(url, (xmlData) => {
        this.umlData = xmlData;
      });
      return this.umlData
    },
    createFileTitle(){
      switch (this.file_type){
        case 0:
          return '创建新的UML文件'
        case 1:
          return '创建新的Doc文件'
        case 2:
          return '创建新的设计原型'
        default:
          return '类型错误！'
      }
    },
  },
  methods:{
    completeDelFile(){
      completelyDelFileByIn({
        username:this.username,
        file_id:this.file_id
      }).then(res=>{
        console.log(res.data)
        //删除后父组件要更新数据
        this.$emit('updateData')
      })
    },
    createUML(){
      console.log({
        username:this.username,
        project_id:this.project_id,
        uml_name:this.fileInitial.name,
      })
      create_uml({
        username:this.username,
        project_id:this.project_id,
        uml_name:this.fileInitial.name,
      }).then((res)=>{
        console.log('return')
        console.log(res.data)
        if(res.data.uml_id){
          this.$router.push({
            name:'UmlDrawer',
            query: {
              uml_url: null,
              uml_id: res.data.uml_id,
              project_id:this.project_id,
            }
          })
        }
        else console.log('创建uml失败')
      })
    },
    createDoc(){
      this.creating_file_name=this.fileInitial.name
      create_doc({
        username:this.username,
        project_id:this.project_id,
        doc_name:this.fileInitial.name,
      }).then((res)=>{
        console.log('return')
        console.log(res.data)
        if(res.data.doc_id){
          this.$router.push({
            name:'DocEditor',
            query: {
              doc_url: null,
              doc_id: res.data.doc_id,
              username:this.username,
              project_id:this.project_id,
              model_id:this.doc_model_id,
              file_name:this.creating_file_name,
              creator:this.creator,
            }
          })
        }
        else console.log('创建doc失败')
      })
    },
    createAxure(){
      create_axure({
        username:this.username,
        project_id:this.project_id,
        axure_name:this.newAxure.name,
        height:this.newAxure.height,
        width:this.newAxure.width
      }).then(res=>{
        console.log(res.data)
        if(res.data.axure_id){
          console.log('create_axure',res.data)
          this.$router.push({
            name:'axure',
            query:{
              axure_id:res.data.axure_id,
              project_id:this.project_id,
              URLpage:null,
              URLpageName:null,
              height:this.newAxure.height,
              width:this.newAxure.width
            }
          })
        }
      })
    },
    recoverFile(){
      recoverFileById({
        username:this.username,
        file_id:this.file_id
      }).then(res=>{
        this.$emit('updateData')
        console.log(res.data)})
    },
    timestampFormat(timestamp) {
      function zeroize(num) {
        return (String(num).length == 1 ? "0" : "") + num;
      }

      var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
      var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

      var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
      var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(),
          m = tmDate.getMonth() + 1,
          d = tmDate.getDate();
      var H = tmDate.getHours(),
          i = tmDate.getMinutes(),
          s = tmDate.getSeconds();

      if (timestampDiff < 60) {
        // 一分钟以内
        return "刚刚";
      } else if (timestampDiff < 3600) {
        // 一小时前之内
        return Math.floor(timestampDiff / 60) + "分钟前";
      } else if (
          curDate.getFullYear() == Y &&
          curDate.getMonth() + 1 == m &&
          curDate.getDate() == d
      ) {
        return "今天" + zeroize(H) + ":" + zeroize(i);
      } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (
            newDate.getFullYear() == Y &&
            newDate.getMonth() + 1 == m &&
            newDate.getDate() == d
        ) {
          return "昨天" + zeroize(H) + ":" + zeroize(i);
        } else if (curDate.getFullYear() == Y) {
          return (
              zeroize(m) +
              "月" +
              zeroize(d) +
              "日 " +
              zeroize(H) +
              ":" +
              zeroize(i)
          );
        } else {
          return (
              Y +
              "年" +
              zeroize(m) +
              "月" +
              zeroize(d) +
              "日 " +
              zeroize(H) +
              ":" +
              zeroize(i)
          );
        }
      }
    },
    openMenu(e) {
      if(this.isNew) return
      this.visible = true
    },
    closeMenu() {
      this.visible = false
    },
    deleteFile(){
      this.$confirm('您将要删除文件:'+this.file_name+', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFileById({
          file_id:this.file_id,
          username:this.username
        }).then(res=> {
          console.log(res.data)
          this.$emit('updateData')
        })
      }).catch(() => {
        console.log('删除')
      });

    },
    renameFile(){
      this.dialogFormVisible1=true
    },
    doFileRename(){
      renameFileById({
        file_id:this.file_id,
        new_file_name:this.fileRename.rename,
        username:this.username,
      }).then(res=> console.log(res.data))
    },
    openFile(){
      //废弃文件不能打开
      if(this.isDel){
        return;
      }
      //打开老文件
      if(!this.isNew) {
        switch (this.file_type) {
          case 0:
            console.log({
              uml_url: this.file_content,
              uml_id: this.file_id,
              project_id:this.project_id
            },'打开已有uml')
            this.$router.push({
              name: 'UmlDrawer',
              query: {
                uml_url: this.file_content,
                uml_id: this.file_id,
                project_id:this.project_id
              }
            })
            break
          case 1:
            this.$router.push({
              name: 'DocEditor',
              query: {
                doc_url: this.file_content,
                doc_id: this.file_id,
                project_id:this.project_id,
                file_name:this.fileInitial.file_name,
                creator:this.creator
              }
            })
            break
          case 2:
            console.log("打开已有的axure",{
              project_id:this.project_id,
              axure_id:this.file_id,
              file_name:this.file_name,
              URLpage:this.file_content,
              URLpageName:this.name_url,
            })
            this.$router.push({
              name: 'axure',
              query: {
                project_id:this.project_id,
                axure_id:this.file_id,
                file_name:this.file_name,
                URLpage:this.file_content,
                URLpageName:this.name_url,
                height:this.height,
                width:this.width
              }
            })
            break
          default:
            console.log('文件类型错误')
        }
      }
      //创建文件
      console.log('创建新文件')
      if(this.file_type!=2){
        this.dialogFormVisible=true
      }else {
        this.dialogFormVisible2=true
      }
    },
    handle(){
      if(this.fileInitial.name==null){
        return
      }
      this.creating_file_name=this.fileInitial.name
      if(this.file_type==0){
        this.createUML()
      }else if(this.file_type==1){
        this.createDoc()
      }
    },

  },
  watch:{
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.username=this.$store.state.username
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/projectDetail.scss";
.file-pre-container{
  margin: 1em;
  //display: flex;
  horiz-align: center;
  height: 140px;
  width: 100px;
  align-items: center;
  flex-direction: column;
  img{
    height: 80px;
    width: 80px;
  }
}
.file-info{
  //position: relative;
  //left: 0.5rem;
  max-width: 80px;
  div{
    font-size: 15px;
    font-family: 黑体;
    text-align: center;
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: relative;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
.bluelight {
  font-weight: lighter;
  font-size: 8px;
  color: #26476d;
}
</style>