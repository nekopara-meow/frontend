<template>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex">
            <h2 class="title gradient">NEKOPARA</h2>
            <nav>
              <router-link to="/projectdetail/projectInfo">概览</router-link>
              <router-link to="/projectdetail/projectFileInfo">文件</router-link>
              <router-link to="">需求</router-link>
              <router-link to="">迭代</router-link>
              <router-link to="">统计</router-link>
              <div class="animation" :class="tab"></div>
            </nav>
          </div>
          <div class="text-wrap">
            <div class="example">
              <div class="avatar-list avatar-list-stacked">
                <span
                  class="avatar cover-image brround"
                  style="
                    background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                  "
                ></span
                ><span
                  class="avatar cover-image brround"
                  style="
                    background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                  "
                ></span
                ><span
                  class="avatar cover-image brround"
                  style="
                    background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                  "
                ></span
                ><span class="avatar cover-image brround">+8</span>
              </div>
            </div>
          </div>
          <div class="buttons">
            <el-dropdown style="margin-right: 30px">
              <el-button type="primary"
                ><el-icon><Sort /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-button type="primary"
              ><el-icon><Plus /></el-icon
            ></el-button>
          </div>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, Plus, CaretBottom } from "@element-plus/icons-vue";
import UMLEditor from "@/components/UMLEditor";
import CoEditor from "@/components/CoEditor";
import {get_docfile,get_umlfile,del_uml,del_doc} from "@/utils/api";
import AxureEditor from "@/components/axureEditor";

export default {
  name: "workspace",
  components: {AxureEditor, CoEditor, UMLEditor, Filter, Sort, Plus, CaretBottom },
  props:{

  },
  data() {
    return {
      project_id:'114514',
      tab: "tab-0",
      dialogFormVisible1: false,
      editing: 0,

      newfile: {
        name: "",
        type: "",
      },
      uml_file:[{
        file_id:1919,
        file_name:'示例文件',
        creator:'列车头'
      },{
        file_id:810,
        file_name:'示例文件',
        creator:'列车头'
      }
      ],
      doc_file:[{
        file_id:1919,
        file_name:'示例文件',
        creator:'列车头'
      },{
        file_id:810,
        file_name:'示例文件',
        creator:'列车头'
      }],
      axure_file:[{
        file_id:1919,
        file_name:'示例文件',
        creator:'列车头'
      },{
        file_id:810,
        file_name:'示例文件',
        creator:'列车头'
      }],
      username:this.$store.state.username,
    };
  },
  methods:{
    load_uml_info(){
      get_umlfile({
        username:this.$store.state.username,
        project_id: this.project_id,
      }).then((res)=>{
        this.uml_file.concat(res.data.ans_list)
        console.log('加载uml文件成功')
        console.log(this.uml_file)
      })
    },
    load_doc_info(){
      get_docfile({
        username:this.$store.state.username,
        project_id: this.project_id,
      }).then((res)=>{
        this.doc_file.concat(res.data.ans_list)
        console.log('加载doc文件成功')
        console.log(this.doc_file)
      })
    },
    del_doc(docID){
      del_doc({
        doc_id:docID
      }).then(res=>{
        this.load_doc_info()
      })
    },
    del_uml(umlID){
      del_doc({
        uml_id:umlID
      }).then(
          (res)=>{
            this.load_uml_info()
        }
      )
    }
  },
  mounted() {
    this.load_doc_info()
    this.load_uml_info()
    if(this.$route.params.project_id) {
      this.project_id = this.$route.params.project_id
    }
  },
  computed:{
    umlNumber(){
      return this.uml_file.length
    },
    docNumber(){
      return this.doc_file.length
    },
    axureNumber(){
      return this.axure_file.length
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/projectDetail.scss";
</style>
