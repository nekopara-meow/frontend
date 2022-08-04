<template>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex">
            <h2 class="title gradient">猫娘乐园</h2>
            <nav>
              <a
                @click="
                  () => {
                    this.tab = 'tab-0';
                  }
                "
                >团队概览</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-1';
                  }
                "
                >团队成员</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-2';
                  }
                "
                >团队项目</a
              >
              <div class="animation" :class="tab"></div>
            </nav>
          </div>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />
        <div id="leftdown1" v-if="tab == 'tab-0'">
          <div id="leftdown1left">
            <img
              id="teamavatar"
              src="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg"
            />
            <span class="bluelight">刘华阳</span
            ><span style="font-size: 13px" class="bluelight"
              >创建于2022/8/5</span
            >
            <div class="text-wrap" style="margin: 10px 0">
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
            <div class="intro bluelight">
              你若去往「绝云间」，便替我采来一束[清心」吧。一束就好。此行的旅费.啊，差些忘了，「契约」生效期间，旅费由你代为垫付。那就有劳了你说，归离原的少年仙人.啊.直至今日，他仍在履行他的职责.哦，这副「连理镇心散」，请替我带给他。对了，可千万不能让小派蒙偷吃了去，这里的药力.绝非常人所能承受。
            </div>
          </div>
          <div id="leftdown1right">
            <div style="display: flex; justify-content: space-between">
              <h2 class="bluelight">团队动态</h2>
              <el-button type="primary" style="margin-right: 30px"
                ><el-icon><Filter /></el-icon
              ></el-button>
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
        <div id="leftdown2" v-if="tab == 'tab-1'">
          <el-collapse
            v-model="activeNames"
            @change="handleChange"
            style="border: none"
            class="onegroup"
          >
            <el-collapse-item
              title="创建者"
              name="1"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown trigger="contextmenu">
                <div class="oneteam">
                  <div
                    class="teamimage"
                    style="
                      background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                    "
                  ></div>
                  <div class="oneteamdown">
                    <div style="font-size: 18px">小秋月</div>
                    <div>真实姓名：贠启豪</div>
                    <div>Email：3499475017@qq.com</div>
                    <div>简介：我将无我，不负人民</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>查看个人资料</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>

            <hr style="margin: 5px" />
            <el-collapse-item
              title="管理员"
              name="2"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown trigger="contextmenu" v-for="i in [1, 2, 3, 4]">
                <div class="oneteam">
                  <div
                    class="teamimage"
                    style="
                      background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                    "
                  ></div>
                  <div class="oneteamdown">
                    <div style="font-size: 18px">小秋月</div>
                    <div>真实姓名：贠启豪</div>
                    <div>Email：3499475017@qq.com</div>
                    <div>简介：我将无我，不负人民</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>查看个人资料</el-dropdown-item>
                    <el-dropdown-item>移出管理员</el-dropdown-item>
                    <el-dropdown-item>移出团队</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>
            <hr style="margin: 5px" />
            <el-collapse-item
              title="成员"
              name="3"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown
                trigger="contextmenu"
                v-for="i in [1, 2, 3, 4, 5, 6]"
              >
                <div class="oneteam">
                  <div
                    class="teamimage"
                    style="
                      background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                    "
                  ></div>
                  <div class="oneteamdown">
                    <div style="font-size: 18px">小秋月</div>
                    <div>真实姓名：贠启豪</div>
                    <div>Email：3499475017@qq.com</div>
                    <div>简介：我将无我，不负人民</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>查看个人资料</el-dropdown-item>
                    <el-dropdown-item>设为管理员</el-dropdown-item>
                    <el-dropdown-item>移出团队</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>
            <hr style="margin: 5px" />
          </el-collapse>
          <!-- <div class="oneteam" v-for="i in [1, 2, 3, 4, 5, 6]">
            <div
              class="teamimage"
              style="
                background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
              "
            ></div>
            <div class="oneteamdown">
              <div style="font-size: 18px">小秋月</div>
              <div>我是傻逼，我是傻逼，我真的是傻逼</div>
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
          </div> -->
        </div>
        <div id="leftdown" v-if="tab == 'tab-2'">
          <div
            class="oneteam"
            style="height: 120px; margin-bottom: 20px"
            v-for="i in [1, 2, 3, 4, 5, 6, 7]"
          >
            <div class="oneteamdown">
              <div style="font-size: 18px">小猫猫</div>
              <div>我是傻逼，我是傻逼，我真的是傻逼</div>
              <div style="margin-bottom: 0">创建日期：2022/8/5</div>
              <div>更新日期：2022/8/6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, Plus, CaretBottom } from "@element-plus/icons-vue";
export default {
  name: "workspace",
  components: { Filter, Sort, Plus, CaretBottom },
  data() {
    return {
      tab: "tab-0",
    };
  },
};
</script>

<style lang="scss" scoped>
.oneteamdown {
  color: #26476d;
  width: 100%;
  overflow: hidden;
  padding: 14px;
  font-size: 10px;
  font-weight: lighter;
  text-overflow: ellipsis;
  white-space: nowrap;
  div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #26476d;
    margin-bottom: 7px;
  }
}
.oneteam {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(1rem);
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
  width: 170px;
  height: 280px;
  margin-right: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: start;
  overflow: hidden;
  .teamimage {
    width: 100%;
    height: 170px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.big {
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(1rem);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 90%;
  width: 85%;
}
#left {
  height: 100%;
  flex: 1 1 70%;
  padding: 10px;
}
#right {
  height: 100%;
  flex: 1 1 30%;
  min-width: 200px;
  padding: 10px;
}
.gradient {
  background-image: linear-gradient(90deg, #4facfe, #7bd4fe, #6acaf7, #4facfe);
  background-size: 200%;
  animation: streamer 5s linear infinite;
  background-clip: text;
  color: transparent;
}
@keyframes streamer {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
.title {
  font-weight: 700;
  font-size: 50px;
  color: #26476d;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#leftup {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#leftdown {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
}

.buttons {
  margin-right: 50px;
  .el-button {
    background-color: #26476d;
    border: none;
  }
}
.onegroupup {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.onegroupdown {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
  padding: 15px;
}
.oneitem {
  width: 120px;
  height: 140px;
  margin-right: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: start;
  font-size: 15px;
  font-weight: lighter;
  img {
    width: 100px;
    margin-bottom: 5px;
  }
}
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
.bluelight {
  font-weight: lighter;
  font-size: 20px;
  color: #26476d;
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
.dongtaicontainer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background-color: #26476d;
}

nav {
  position: relative;
  width: 300px;
  height: 50px;

  border-radius: 8px;
  transform: translate(0px, 24px);
  margin-left: 20px;
}

nav a {
  position: relative;
  display: block;
  float: left;
  font-size: 15px;
  line-height: 50px;
  width: 100px;
  height: 50px;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-weight: lighter;
  cursor: pointer;
  /* background-color: #00b894; */
  z-index: 10;
}

nav .animation {
  position: absolute;
  height: 100%;
  // background-color: #f97f51;
  z-index: 9;
  transition: all 0.3s;
  border-bottom: 5px solid #26476d;
}

.tab-0,
nav a:hover ~ .animation {
  width: 100px;
  left: 0px;
}
.tab-1,
nav a:nth-child(2):hover ~ .animation {
  width: 100px;
  left: 100px;
}
.tab-2,
nav a:nth-child(3):hover ~ .animation {
  width: 100px;
  left: 200px;
}

.avatar {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  display: inline-block;
  background: #26476d no-repeat center/cover;
  position: relative;
  text-align: center;
  color: #fff;
  font-weight: 600;
  vertical-align: bottom;
  font-size: 0.875rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.avatar i {
  font-size: 125%;
  vertical-align: sub;
}

.avatar-list {
  margin: 0 0 -0.5rem;
  padding: 0;
  font-size: 0;
}
.avatar-list .avatar {
  margin-bottom: 0.5rem;
}
.avatar-list .avatar:not(:last-child) {
  margin-right: 0.5rem;
}
.avatar-list-stacked .avatar {
  margin-right: -0.8em !important;
}
.avatar-list-stacked .avatar {
  box-shadow: 0 0 0 2px #fff;
}

.brround {
  border-radius: 50%;
}
.example {
  padding: 0;
  border: 1px solid rgba(167, 180, 201, 0.3);
  border-radius: 3px 3px 0 0;
  font-size: 0.9375rem;
  border: none;
  width: 150px;
}
.text-wrap {
  font-size: 14px;
  line-height: 1.66;
  margin-top: 3px;
  border: none;
}
.text-wrap > :first-child {
  margin-top: 0;
}
.text-wrap > :last-child {
  margin-bottom: 0;
}
#teamavatar {
  width: 200px !important;
  height: 200px !important;
  object-fit: cover;
  border: 10px solid white;
  border-radius: 20px;
  box-shadow: 0px 15px 10px -15px lightgray;
  margin-bottom: 15px;
  flex-shrink: 0;
}
.intro {
  font-size: 14px;
  width: 200px;
  text-indent: 2em;
}
.dongtai {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.185),
    rgba(255, 255, 255, 0.042)
  );
  backdrop-filter: blur(1rem);
  width: 300px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.392);
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: 60px;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0px 15px 10px -15px rgb(211, 211, 211);
    margin-right: 10px;
  }
}
.el-button {
  background-color: #26476d;
  border: none;
}
#leftdown2 {
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
}
::v-deep .el-collapse-item__header {
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: lighter;
  color: #26476d;
}
::v-deep .el-collapse-item__wrap {
  background-color: transparent;
  border: none;
  display: flex;
}
::v-deep .el-collapse-item__content {
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
