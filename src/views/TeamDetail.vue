<template>
  <div class="big">
    <el-dialog v-model="dialogFormVisible1" title="邀请成员" width="30%" center>
      <el-form :model="invite">
        <el-form-item label="用户名称">
          <el-input v-model="invite.invitee" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="this.dialogFormVisible1 = false"
            style="background-color: white"
            >Cancel</el-button
          >
          <el-button type="primary" @click="invitenewmember">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible2" title="新建项目" width="30%" center>
      <el-form :model="newproject">
        <el-form-item label="项目名称">
          <el-input v-model="newproject.project_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input
            type="textarea"
            :rows="3"
            v-model="newproject.brief_intro"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="this.dialogFormVisible2 = false"
            style="background-color: white"
            >Cancel</el-button
          >
          <el-button type="primary" @click="creatproject">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex; width: 100%; height: 80px">
            <h2 class="title" v-if="editing == 0">
              {{ teammsg.team_name }}
            </h2>
            <el-input
              v-else
              v-model="form.name"
              placeholder="团队名称"
              style="display: line; width: 200px; font-size: 30px"
            />
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
              <a
                @click="
                  () => {
                    this.tab = 'tab-3';
                  }
                "
                >项目回收站</a
              >
              <div class="animation" :class="tab"></div>
            </nav>
          </div>
          <div class="buttons">
            <el-button
              type="primary"
              @click="edit"
              v-if="tab == 'tab-0' && editing == 0"
              ><el-icon><Edit /></el-icon
            ></el-button>
            <el-button
              type="primary"
              @click="edit"
              v-if="tab == 'tab-0' && editing == 1"
              ><el-icon><Upload /></el-icon
            ></el-button>
            <el-button
              type="primary"
              @click="this.dialogFormVisible1 = true"
              v-if="tab == 'tab-1'"
              ><el-icon><Plus /></el-icon
            ></el-button>
            <el-button
              type="primary"
              @click="this.dialogFormVisible2 = true"
              v-if="tab == 'tab-2'"
              ><el-icon><Plus /></el-icon
            ></el-button>
          </div>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />
        <div id="leftdown1" v-if="tab == 'tab-0'">
          <div id="leftdown1left">
            <img
              id="teamavatar"
              :src="teammsg.avatar"
              v-if="editing == 0"
            /><el-upload
              v-else
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="handleBeforeUpload"
              :http-request="uploadURL"
              v-model="form.avatar"
              :style="
                'background-image: url(' +
                form.avatar +
                ');background-size:cover;background-position:center'
              "
              style="
                width: 200px !important;
                height: 200px !important;
                flex-shrink: 0;
                box-shadow: 0px 15px 10px -15px lightgray;
                margin-bottom: 15px;
              "
            >
              <!-- <img v-if="flag == 1" class="upper" :src="url" /> -->
              <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <span class="bluelight">{{ teammsg.creator }}</span
            ><span style="font-size: 13px" class="bluelight"
              >创建于{{ teammsg.create_time }}</span
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
            <div class="intro bluelight" v-if="editing == 0">
              {{ teammsg.brief_intro }}
            </div>
            <el-input
              v-else
              v-model="form.brief_intro"
              placeholder="简介"
              type="textarea"
              :rows="4"
              style="display: line; width: 200px; font-size: 10px"
            />
          </div>
          <div id="leftdown1right">
            <div style="display: flex; justify-content: space-between">
              <h2 class="bluelight">团队动态</h2>
              <!-- <el-button type="primary" style="margin-right: 30px"
                ><el-icon><Filter /></el-icon
              ></el-button> -->
            </div>

            <hr style="margin: 5px; margin-bottom: 20px" />
            <div class="dongtaicontainer">
              <div class="dongtai" v-for="i in [1, 2, 3, 4, 5, 6]">
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
                    :style="{
                      backgroundImage: `url(` + teamcreator.avatar + ')',
                    }"
                  ></div>
                  <div class="oneteamdown">
                    <div style="font-size: 18px">
                      {{ teamcreator.nickname }}
                    </div>
                    <div>用户名：{{ teamcreator.creator }}</div>
                    <div>{{ teamcreator.email }}</div>
                    <div>简介：{{ teamcreator.brief_intro }}</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.natice="checkuserinfo(teamcreator.creator)"
                      >查看个人资料</el-dropdown-item
                    >
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
              <el-dropdown
                trigger="contextmenu"
                v-for="(teamadmin, index) in teamadmins"
                :key="index"
              >
                <div class="oneteam">
                  <div
                    class="teamimage"
                    :style="{
                      backgroundImage: `url(` + teamadmin.avatar + ')',
                    }"
                  ></div>
                  <div class="oneteamdown">
                    <div style="font-size: 18px">{{ teamadmin.nickname }}</div>
                    <div>用户名：{{ teamadmin.username }}</div>
                    <div>{{ teamadmin.email }}</div>
                    <div>简介：{{ teamadmin.brief_intro }}</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.native="checkuserinfo(teamadmin.username)"
                      >查看个人资料</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="deleteadmin(teamadmin.username)"
                      >移出管理员</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="deletemember(teamadmin.username)"
                      >移出团队</el-dropdown-item
                    >
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
                v-for="(teammember, index) in teammembers"
                :key="index"
              >
                <div class="oneteam">
                  <div
                    class="teamimage"
                    :style="{
                      backgroundImage: `url(` + teammember.avatar + ')',
                    }"
                  ></div>
                  <div class="oneteamdown">
                    <div style="font-size: 18px">{{ teammember.nickname }}</div>
                    <div>用户名：{{ teammember.username }}</div>
                    <div>{{ teammember.email }}</div>
                    <div>简介：{{ teammember.brief_intro }}</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.natice="checkuserinfo(teammember.username)"
                      >查看个人资料</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.natice="setadmin(teammember.username)"
                      >设为管理员</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.natice="deletemember(teammember.username)"
                      >移出团队</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>
            <hr style="margin: 5px" />
          </el-collapse>
        </div>
        <div id="leftdown" v-if="tab == 'tab-2'">
          <el-dropdown
            trigger="contextmenu"
            v-for="(teamproject, index) in teamprojects"
            :key="index"
          >
            <div
              class="oneteam"
              @click="gotoproject(teamproject.project_id)"
              style="height: 120px; margin-bottom: 20px"
            >
              <div
                class="oneteamdown"
                style="
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                "
              >
                <div style="font-size: 18px">
                  {{ teamproject.project_name }}
                </div>
                <div>
                  {{ teamproject.project_brief_intro }}
                </div>
                <div style="margin-bottom: 0">
                  创建日期：{{ teamproject.project_create_time }}
                </div>
                <div>更新日期：2022/8/5</div>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div id="leftdown" v-if="tab == 'tab-3'">
          <el-dropdown
            trigger="contextmenu"
            v-for="(teamproject, index) in teamprojects"
            :key="index"
          >
            <div class="oneteam" style="height: 120px; margin-bottom: 20px">
              <div
                class="oneteamdown"
                style="
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                "
              >
                <div style="font-size: 18px">
                  {{ teamproject.project_name }}
                </div>
                <div>
                  {{ teamproject.project_brief_intro }}
                </div>
                <div style="margin-bottom: 0">
                  创建日期：{{ teamproject.project_create_time }}
                </div>
                <div>更新日期：2022/8/5</div>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="">还原</el-dropdown-item>
                <el-dropdown-item @click.native="">彻底删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import {
  Filter,
  Sort,
  Plus,
  CaretBottom,
  Edit,
  Upload,
} from "@element-plus/icons-vue";
import {
  deleteteammem,
  establishproject,
  getteamadmin,
  getteamcreator,
  getteammember,
  getteammsgbyid,
  getteamprojectbyid,
  invitemember,
  setteamadmin,
} from "@/utils/api";
import Base64 from "@/utils/Base64";
export default {
  name: "workspace",
  components: { Filter, Sort, Plus, CaretBottom, Edit, Upload },
  created() {
    console.log("invitee", this.invite.invitee);
    console.log("team_idhhh", this.team_id);
    getteamcreator({ team_id: this.team_id }).then((response) => {
      console.log(response.data);
      if (response.data.status_code == 1) {
        (this.teamcreator.creator = response.data.creator),
          (this.teamcreator.nickname = response.data.nickname),
          (this.teamcreator.email = response.data.email),
          (this.teamcreator.avatar = response.data.avatar),
          (this.teamcreator.brief_intro = response.data.brief_intro);
        console.log("creator", response.data);
        this.teamuserin = response.data.ans_list;
      } else ElMessage.error(response.data.message);
    });
    this.initializationdata();
  },
  data() {
    return {
      form: {
        avatar: "",
        intro: "",
        name: "",
      },
      team_id: JSON.parse(Base64.decode(this.$route.query.info)).team_id,
      tab: "tab-0",
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      teamcreator: {
        creator: "",
        nickname: "",
        email: "",
        avatar: "",
        brief_intro: " ",
      },
      editing: 0,
      invite: {
        inviter: this.$store.state.username,
        invitee: "",
        team_id: JSON.parse(Base64.decode(this.$route.query.info)).team_id,
      },
      newproject: {
        team_id: JSON.parse(Base64.decode(this.$route.query.info)).team_id,
        username: this.$store.state.username,
        project_name: "",
        brief_intro: "",
      },
      teamadmins: [],
      teammembers: [],
      teamprojects: [],
      teammsg: {
        brief_intro: "",
        create_time: "",
        creator: "",
        team_name: "",
        avatar: "",
      },
      username: this.$store.state.username,
      formLabelWidth: "140px",
    };
  },
  methods: {
    gotoproject(a) {
      console.log("pp", a),
        this.$router.push({
          name: "projectInfo",
          query: {
            project_id: a,
          },
        });
    },
    invitenewmember() {
      invitemember(this.invite).then((response) => {
        if (response.data.status_code == 1) {
          ElMessage({
            message: "邀请成功",
            type: "success",
          });
          this.initializationmember();
        } else ElMessage.error(response.data.msg);
      });
      this.invite.invitee = "";
      this.dialogFormVisible1 = false;
    },

    creatproject() {
      console.log(111);
      establishproject(this.newproject).then((response) => {
        if (response.data.status_code === 1) {
          this.initializationdata();
        } else ElMessage.error(response.data.msg);
      });
      this.dialogFormVisible2 = false;
    },
    edit() {
      if (this.editing == 0) {
        this.editing = 1;
      } else {
        this.editing = 0;
        ElMessage({
          message: this.form,
          type: "success",
        });
      }
    },
    handleBeforeUpload(file) {
      const isJPEG = file.name.split(".")[1] === "jpeg";
      const isJPG = file.name.split(".")[1] === "jpg";
      const isPNG = file.name.split(".")[1] === "png";
      const isWEBP = file.name.split(".")[1] === "webp";
      const isGIF = file.name.split(".")[1] === "gif";
      const isLt500K = file.size / 1024 / 1024 / 1024 / 1024 < 4;
      if (!isJPG && !isJPEG && !isPNG && !isWEBP && !isGIF) {
        this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
      }
      if (!isLt500K) {
        this.$message.error("单张图片大小不能超过 4mb!");
      }
      return (isJPEG || isJPG || isPNG || isWEBP || isGIF) && isLt500K;
    },
    uploadURL(file) {
      console.log(file.file);
      //注意哦，这里指定文件夹'image/'，尝试过写在配置文件，但是各种不行，写在这里就可以
      var fileName = "tuanduitouxiang/" + getFileNameUUID() + ".jpg";
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      client()
        .multipartUpload(fileName, file.file, {
          progress: function (percentage, cpt) {
            console.log("打印进度", percentage);
          },
        })
        .then((res) => {
          ElMessage({
            message: "图片上传成功",
            type: "success",
          });
          //此处赋值，是相当于上传成功之后，手动拼接服务器地址和文件名
          this.formavatar =
            "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName;
        });
    },
    checkuserinfo() {},
    initializationdata() {
      getteammsgbyid({ team_id: this.team_id }).then((response) => {
        if (response.data.status_code == 1) {
          (this.teammsg.brief_intro = response.data.brief_intro),
            (this.teammsg.create_time = response.data.create_time),
            (this.teammsg.creator = response.data.creator),
            (this.teammsg.team_name = response.data.team_name),
            (this.teammsg.avatar = response.data.avatar);
          this.form.avatar = response.data.avatar;
          this.form.intro = response.data.brief_intro;
          this.form.name = response.data.team_name;
        } else ElMessage.error(response.data.message);
      });
      getteamadmin({ team_id: this.team_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.teamadmins = response.data.ans_list;
        } else ElMessage.error(response.data.message);
      });
      getteammember({ team_id: this.team_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.teammembers = response.data.ans_list;
        } else ElMessage.error(response.data.message);
      });
      getteamprojectbyid({ team_id: this.team_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.teamprojects = response.data.ans_list;
        } else ElMessage.error(response.data.message);
      });
    },
    //成员操作
    initializationmember() {
      getteamadmin({ team_id: this.team_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.teamadmins = response.data.ans_list;
        } else ElMessage.error(response.data.message);
      });
      getteammember({ team_id: this.team_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.teammembers = response.data.ans_list;
        } else ElMessage.error(response.data.message);
      });
    },
    setadmin(membername) {
      setteamadmin({
        setter: this.$store.state.username,
        settee: membername,
        team_id: this.team_id,
      }).then((response) => {
        if (response.data.status_code == 1) {
          this.initializationmember();
          console.log(response.data);
          ElMessage({
            message: "设置成功",
            type: "success",
          });
        } else ElMessage.error(response.data.msg);
      });
    },
    deletemember(membername) {
      console.log({
        deleter_username: this.$store.state.username,
        deletee_username: membername,
        team_id: this.team_id,
      });
      deleteteammem({
        deleter_username: this.$store.state.username,
        deletee_username: membername,
        team_id: this.team_id,
      }).then((response) => {
        if (response.data.status_code == 1) {
          this.initializationmember(),
            ElMessage({
              message: "移出成功",
              type: "success",
            });
        } else ElMessage.error(response.data.msg);
      });
    },
    deleteadmin() {},
    checkinfo() {},
    //项目操作
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border: 10px solid white;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: white;
  font-weight: 500;
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
  background-color: #0000005b;
}
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
  height: 80px;
}
#leftdown {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
  height: 60vh;
  padding: 0 5px;
}
#leftdown1 {
  display: flex;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  height: 60vh;
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
  box-sizing: border-box;
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
  width: 400px;
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
.tab-3,
nav a:nth-child(4):hover ~ .animation {
  width: 100px;
  left: 300px;
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
  height: 60vh;
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
::v-deep .el-dialog {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.905),
    rgba(255, 255, 255, 0.622)
  );
  backdrop-filter: blur(1rem);
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  font-weight: lighter;
  font-size: 23px;
  color: #26476d;
  overflow: hidden;
  .el-button {
    background-color: #26476d;
    border: none;
  }
}
::v-deep .el-dialog__header {
  margin-right: 0;
  color: white;
  background: linear-gradient(to right bottom, #26476def, #26476dc5);
}
</style>
