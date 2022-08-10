<template>
  <div id="leftdown1">
    <div id="leftdown1left">
      <div style="display: flex; justify-content: space-between">
        <h2 class="bluelight">项目信息</h2>
      </div>

      <hr style="margin: 5px; margin-bottom: 20px" />
      <span class="bluelight">团队：猫娘乐园</span>
      <span class="bluelight">创建人：{{ data.creator }}</span
      ><span style="font-size: 13px" class="bluelight"
        >创建于{{ data.createtime }}</span
      >

      <div class="intro bluelight" style="margin-top: 10px">
        {{ data.intro }}
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
        <div class="dongtai" v-for="i in [1, 2]">
          <img
            src="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg"
          />
          <div class="dongtairight bluelight">
            <div>刘华阳</div>
            <div style="font-size: 15px">创建了项目：NEKOPARA</div>
            <div style="font-size: 13px">2022/8/5</div>
          </div>
        </div>
        <div class="dongtai" v-for="i in [1, 2]">
          <img
            src="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg"
          />
          <div class="dongtairight bluelight">
            <div>小七</div>
            <div style="font-size: 15px">邀请了成员：吕双羽</div>
            <div style="font-size: 13px">2022/8/5</div>
          </div>
        </div>
        <div class="dongtai" v-for="i in [1, 2]">
          <img
            src="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg"
          />
          <div class="dongtairight bluelight">
            <div>徐凡</div>
            <div style="font-size: 15px">成为了管理员</div>
            <div style="font-size: 13px">2022/8/5</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Filter, Sort, Edit, Plus, CaretBottom } from "@element-plus/icons-vue";
export default {
  name: "projectInfo",
  components: { Edit },
  data() {
    return {
      editing: 0,
      data: {
        creator: "刘华阳",
        createtime: "2022/8/5",
        avatar:
          "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg",
        intro:
          "你若去往「绝云间」，便替我采来一束[清心」吧。一束就好。此行的旅费.啊，差些忘了，「契约」生效期间，旅费由你代为垫付。那就有劳了你说，归离原的少年仙人.啊.直至今日，他仍在履行他的职责.哦，这副「连理镇心散」，请替我带给他。对了，可千万不能让小派蒙偷吃了去，这里的药力.绝非常人所能承受。",
      },
    };
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
