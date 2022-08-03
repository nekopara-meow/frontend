<template>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <h2 class="title gradient">最近打开</h2>
          <div class="buttons">
            <el-dropdown style="margin-right: 30px">
              <el-button type="primary"
                ><el-icon><Sort /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>按项目分组</el-dropdown-item>
                  <el-dropdown-item>按格式分组</el-dropdown-item>
                  <el-dropdown-item>按时间分组</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown>
              <el-button type="primary"
                ><el-icon><Filter /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <hr style="margin: 5px" />

        <div id="leftdown">
          <el-collapse
            v-model="activeNames"
            @change="handleChange"
            style="border: none"
            class="onegroup"
          >
            <el-collapse-item
              title="小学期项目"
              name="1"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown
                trigger="contextmenu"
                v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
              >
                <div class="oneitem">
                  <img src="..\assets\img\fileicons\Word.png" />
                  <div>少年阿宾.txt</div>
                  <div style="font-size: smaller; margin-top: 2px">
                    2022/8/3
                  </div>
                </div>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>打开</el-dropdown-item>
                    <el-dropdown-item>在新标签页中打开</el-dropdown-item>
                    <el-dropdown-item>移出工作台</el-dropdown-item>
                    <el-dropdown-item>历史版本</el-dropdown-item>
                    <el-dropdown-item>属性</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>

            <hr style="margin: 5px" />
            <el-collapse-item
              title="软工项目"
              name="2"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown
                trigger="contextmenu"
                v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
              >
                <div class="oneitem">
                  <img src="..\assets\img\fileicons\txt.png" />
                  <div>少年阿宾.txt</div>
                </div>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>打开</el-dropdown-item>
                    <el-dropdown-item>在新标签页中打开</el-dropdown-item>
                    <el-dropdown-item>移出工作台</el-dropdown-item>
                    <el-dropdown-item>历史版本</el-dropdown-item>
                    <el-dropdown-item>属性</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>
            <hr style="margin: 5px" />
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, CaretBottom } from "@element-plus/icons-vue";
export default {
  name: "workspace",
  components: { Filter, Sort, CaretBottom },
};
</script>

<style lang="scss" scoped>
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
.buttons {
  margin-right: 50px;
  .el-button {
    background-color: #26476d;
    border: none;
    :hover {
    }
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
#rightdown {
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
}
#rightup {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.onediedai {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.2)
  );
  width: 90%;
  height: 80px;
  margin: 0 auto;
  margin-bottom: 10px;
  backdrop-filter: blur(1rem);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
  border-left: 10px solid rgba(144, 238, 144, 0.307);
}
.busy {
  border-left: 10px solid rgba(240, 128, 128, 0.259);
}
.warn {
  border-left: 10px solid rgba(233, 233, 133, 0.377);
}
</style>
