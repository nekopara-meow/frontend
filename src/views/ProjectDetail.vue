<template>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex">
            <h2 class="title gradient">NEKOPARA</h2>
            <nav class="nav-link">
              <router-link :to="{name:'projectInfo',query:{
                project_id:this.project_id
              }}" @click="tab='tab-0'">概览</router-link>
              <router-link :to="{name:'projectFileInfo',query:{
                project_id:this.project_id
              }}" @click="tab='tab-1'">文件</router-link>
              <router-link to="" @click="tab='tab-2'">回收站</router-link>
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
        </div>
        <hr style="margin: 5px; margin-bottom: 20px" />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, Edit, Plus, CaretBottom } from "@element-plus/icons-vue";
import UMLEditor from "@/components/rubbish/UMLEditor";
import CoEditor from "@/components/rubbish/CoEditor";
import { get_docfile, get_umlfile, del_uml, del_doc } from "@/utils/api";
import AxureEditor from "@/components/rubbish/axureEditor";

export default {
  name: "projectDetail",
  components: { Edit },
  props: {},
  data() {
    return {
      project_id: "",
      tab: "tab-0",
      dialogFormVisible1: false,
      editing: 0,
      username: "",
    };
  },
  methods:{

  },
  watch:{
    $route(val){
      console.log('route is watched',val)
      if(val.name==='projectInfo'){
        this.tab='tab-0'
      }
      if(val,name==='projectFileInfo'){
        this.tab='tab-1'
      }
    }
  },
  created() {
    console.log('route in projectDetail')
    console.log(this.$route)
    if(this.$route.query.project_id){
      this.project_id=this.$route.query.project_id
      this.username=this.$store.state.username
    }
    console.log(this.project_id)
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/projectDetail.scss";
.nav-link {
  a {
    color: black;
  }
}
</style>
