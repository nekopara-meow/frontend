<template>
  <div id="leftdown1">
    <div id="leftdown1left">
      <div style="display: flex; justify-content: space-between">
        <h2 class="bluelight">项目信息</h2>
      </div>

      <hr style="margin: 5px; margin-bottom: 20px" />
      <span class="bluelight">团队：{{data.team_name}}</span>
      <span class="bluelight">创建人：{{ data.creator }}</span
      ><span style="font-size: 13px" class="bluelight"
        >创建于{{ data.createtime }}</span
      >

      <div class="intro bluelight" style="margin-top: 10px">
        简介:{{ data.intro }}
      </div>

      <div
        style="display: flex; justify-content: space-between; margin-top: 20px"
      >
        <h2 class="bluelight">项目进度</h2>
      </div>

      <hr style="margin: 5px; margin-bottom: 20px" />
      <div
        class="progress"
        style="
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-around;
          background-color: transparent;
          flex-shrink: 0;
        "
      >
        <div class="pg" style="height: 100%; flex: 0 1 35%">
          <span class="bluelight" style="font-size: 13px">已完成</span>
          <span class="bluelight" style="font-size: 30px">11</span>
          <el-progress status="success" :percentage="50" :show-text="false">
          </el-progress>
        </div>
        <div class="pg" style="height: 100%; flex: 0 1 35%">
          <span class="bluelight" style="font-size: 13px">未完成</span>
          <span class="bluelight" style="font-size: 30px">11</span>
          <el-progress status="warning" :percentage="50" :show-text="false">
          </el-progress>
        </div>
      </div>
    </div>
    <div id="leftdown1right">
      <div style="display: flex; justify-content: space-between">
        <h2 class="bluelight">项目动态</h2>
      </div>

      <hr style="margin: 5px; margin-bottom: 20px" />
      <div class="dongtaicontainer">
        <div class="dongtai" v-for="(message, index) in projectdongtai" :key="index">
          <img
            src="message.avatar"
          />
          <div class="dongtairight bluelight">
            <div>{{ message.sender }}</div>
            <div style="font-size: 15px">{{message.msg}}</div>
            <div style="font-size: 13px">{{ message.send_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Filter, Sort, Edit, Plus, CaretBottom } from "@element-plus/icons-vue";
import {getprojectinfo, getprojectmessage} from "@/utils/api";
import {ElMessage} from "element-plus";
export default {
  name: "projectInfo",
  components: { Edit },
  data() {
    return {
      projectdongtai:[],
      project_id:this.$route.params.project_id,
      editing: 0,
      data: {
        creator: "刘华阳",
        createtime: "2022/8/5",
        intro: "",
        team_name: "",
      },
    };
  },
  created() {this.getprojectinfos();
    this.getprojectdongtai();
  },
  methods:{
    getprojectinfos(){
      getprojectinfo({project_id:this.project_id}).then((response) => {
        if (response.data.status_code == 1) {
          console.log("xinxi2",response.data);
          this.data.intro=response.data.brief_intro;
          this.data.create_time=response.data.create_time;
          this.data.creator=response.data.creator;
          this.data.team_name=response.data.team_name;
        } else ElMessage.error(response.data.message);
      });
    },
    getprojectdongtai(){
      getprojectmessage({ project_id:this.project_id }).then((response) => {
        if (response.data.status_code == 1) {
          console.log(response.data)
          this.projectdongtai=response.data.ans_list;
        }
      });
    },
  }

};
</script>

<style lang="scss" scoped>
@import "../assets/scss/projectDetail";
#leftdown {
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
}
#leftdown1 {
  display: flex;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
  flex-direction: row;
}
#leftdown1left {
  flex: 0 1 30%;
  height: 100%;
  min-width: 230px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;
}
#leftdown1right {
  flex: 0 1 70%;
  height: 100%;

  padding: 20px;
}
</style>
