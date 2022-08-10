<template>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <h2 class="title gradient">最近打开</h2>
          <div class="buttons">
            <el-dropdown>
              <el-button type="primary"
                ><el-icon><Filter /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="sortByTime(1)"
                    >按修改时间升序</el-dropdown-item
                  >
                  <el-dropdown-item @click="sortByTime(-1)"
                    >按修改时间降序</el-dropdown-item
                  >
                  <el-dropdown-item @click="sortByFileName(1)"
                    >按文件名升序</el-dropdown-item
                  >
                  <el-dropdown-item @click="sortByFileName(-1)"
                    >按文件名降序</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <hr style="margin: 5px" />

        <div id="leftdown">
          <el-skeleton :rows="5" animated v-if="got != 1" />
          <el-empty
            description="空空如也"
            v-if="got == 1 && all_file.length == 0"
            style="margin: 0 auto"
          />
          <div class="fileDisplayer">
            <file-preview
              @updateData="reloadData"
              v-if="got == 1 && all_file.length != 0"
              v-for="(tmp, index) in all_file"
              :file_id="tmp.file_id"
              :update_time="tmp.update_time"
              :file_type="tmp.file_type"
              :creator="tmp.creator"
              :file_name="tmp.file_name"
              :file_content="tmp.file_content"
              :project_id="tmp.project_id"
              :width="tmp.width"
              :height="tmp.height"
              :key="index"
            ></file-preview>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, CaretBottom } from "@element-plus/icons-vue";
import FilePreview from "@/components/file_componets/filePreview";
import { getRecentFile } from "@/utils/api";
export default {
  name: "Recent",
  components: { FilePreview, Filter, Sort, CaretBottom },
  data() {
    return {
      all_file: [],
      username: "",
      got: 0,
    };
  },

  methods: {
    sortByTime(asc) {
      this.all_file.sort(function (a, b) {
        return b.update_time < a.update_time ? asc : asc * -1;
      });
    },
    sortByFileName(asc) {
      this.all_file.sort(function (a, b) {
        return b.file_name < a.file_name ? asc : asc * -1;
      });
    },
    reloadData() {
      this.got = 0;
      getRecentFile({
        username: this.username,
      }).then((res) => {
        console.log(res.data);
        this.all_file = res.data.ans_list;
        this.got++;
      });
    },
  },
  mounted() {
    this.username = this.$store.state.username;
    this.reloadData();
  },
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
  width: 100%;
  flex: 1 1 60%;
  flex-direction: row;
  padding: 1rem;
  overflow-y: hidden;
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
  -webkit-background-clip: text;
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
  margin-left: 2rem;
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
  height: 60vh;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
.fileDisplayer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
