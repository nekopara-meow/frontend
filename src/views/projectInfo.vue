<template>
  <el-skeleton
    :rows="5"
    style="height: 63vh"
    animated
    v-if="got2 == 0 && got3 == 0"
  />
  <div id="leftdown1" v-else>
    <div id="leftdown1left">
      <div style="display: flex; justify-content: space-between">
        <h2 class="bluelight">项目信息</h2>
      </div>

      <hr style="margin: 5px; margin-bottom: 20px" />
      <span class="bluelight">团队：{{ data.team_name }}</span>
      <span class="bluelight">创建人：{{ data.creator }}</span
      ><span style="font-size: 13px" class="bluelight"
        >创建于{{  this.timestampFormat(new Date(data.create_time).valueOf() / 1000) }}</span
      >

      <div class="intro bluelight" style="margin-top: 10px;word-break: break-all">
        简介:{{ data.intro }}
      </div>

      <div
        style="display: flex; justify-content: space-between; margin-top: 20px"
      >
        <h2 class="bluelight">文件概况</h2>
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
        <div class="pg" style="height: 90%; flex: 0 1 30%">
          <span class="bluelight" style="font-size: 10px; margin-bottom: 0"
            >UML文档</span
          >
          <span class="bluelight" style="font-size: 30px; margin-bottom: 0"
            >{{uml_num}}</span
          >
          <el-progress status="success" :percentage="100*uml_num/(uml_num+doc_num+axure_num)" :show-text="false">
          </el-progress>
        </div>
        <div class="pg" style="height: 90%; flex: 0 1 30%">
          <span class="bluelight" style="font-size: 10px; margin-bottom: 0"
            >Doc文档</span
          >
          <span class="bluelight" style="font-size: 30px; margin-bottom: 0"
            >{{doc_num}}</span
          >
          <el-progress status="warning" :percentage="100*doc_num/(uml_num+doc_num+axure_num)" :show-text="false">
          </el-progress>
        </div>
        <div class="pg" style="height: 90%; flex: 0 1 30%">
          <span class="bluelight" style="font-size: 10px; margin-bottom: 0"
            >原型文档</span
          >
          <span class="bluelight" style="font-size: 30px; margin-bottom: 0"
            >{{axure_num}}</span
          >
          <el-progress :percentage="100*axure_num/(uml_num+doc_num+axure_num)" :show-text="false"> </el-progress>
        </div>
      </div>
    </div>

    <div id="leftdown1right">
      <div style="display: flex; justify-content: space-between">
        <h2 class="bluelight">项目动态</h2>
      </div>

      <hr style="margin: 5px; margin-bottom: 20px" />
      <el-empty
        description="空空如也"
        v-if="got3 != 0 && projectdongtai.length == 0"
        style="margin: 0 auto"
      />
      <div class="dongtaicontainer" v-else>
        <div
          class="dongtai"
          v-for="(message, index) in projectdongtai"
          :key="index"
        >
          <img :src="message.avatar" />
          <div class="dongtairight bluelight">
            <div>{{ message.sender }}</div>
            <div style="font-size: 15px">{{ message.msg }}</div>
            <div style="font-size: 13px">{{ message.send_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Filter, Sort, Edit, Plus, CaretBottom } from "@element-plus/icons-vue";
import {get_file_number, getprojectinfo, getprojectmessage} from "@/utils/api";
import { ElMessage } from "element-plus";
export default {
  name: "projectInfo",
  components: { Edit },
  data() {
    return {
      got2: 0,
      got3: 0,
      projectdongtai: [],
      project_id: this.$route.query.project_id,
      editing: 0,
      data: {
        creator: "刘华阳",
        create_time: "",
        intro: "",
        team_name: "",
      },
      uml_num:'',
      doc_num:'',
      axure_num:'',
    };
  },
  created() {
    this.getprojectinfos();
    console.log(this.$route);
    this.getprojectdongtai();
    console.log("msg", this.projectinfo);
  },
  methods: {
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
    getprojectinfos() {
      getprojectinfo({ project_id: this.project_id }).then((response) => {
        if (response.data.status_code == 1) {
          console.log("xinxi2", response.data);
          this.data.intro = response.data.brief_intro;
          this.data.create_time = response.data.create_time;
          this.data.creator = response.data.creator;
          this.data.team_name = response.data.team_name;
          this.got2 = 1;
        } else ElMessage.error(response.data.message);
        get_file_number({
          project_id:this.project_id
        }).then(res=>{
          console.log(res.data)
          if(res.data.status_code==1){
            this.uml_num=res.data.uml_num
            this.doc_num=res.data.doc_num
            this.axure_num=res.data.axure_num
          }
        })
      });
    },
    getprojectdongtai() {
      getprojectmessage({ project_id: this.project_id }).then((response) => {
        if (response.data.status_code == 1) {
          console.log(response.data);
          this.projectdongtai = response.data.ans_list;
          this.got3 = 1;
        }
      });
    },
  },

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
