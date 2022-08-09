<template>
  <div class="big">
    <div id="content">
      <div id="up">
        <img v-if="editing == 0" :src="data.avatar" />
        <el-upload
          v-else
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="handleBeforeUpload"
          :http-request="uploadURL"
          v-model="data.avatar"
          :style="
            'background-image: url(' +
            data.avatar +
            ');background-size:cover;background-position:center'
          "
          style="
            position: absolute;

            bottom: -50px;
            left: 150px;
          "
        >
          <!-- <img v-if="flag == 1" class="upper" :src="url" /> -->
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div id="down">
        <el-button
          v-if="editing === 0&&author===1"
          type="primary"
          id="editbutton"
          @click="edit"
          ><el-icon><Edit /></el-icon
        ></el-button>
        <el-button v-else-if="editing===1" type="primary" id="editbutton" @click="edit"
          ><el-icon><Upload /></el-icon
        ></el-button>
        <div>
          <span>{{ data.username }} </span>
          <img v-if="editing == 0" :src="genderimg" />

          <el-select
            v-else
            placeholder="性别"
            v-model="data.gender"
            style="
              display: line;
              width: 70px;
              margin-right: 10px;
              font-size: 15px;
            "
          >
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
            <el-option label="猫猫" :value="2" />
          </el-select>

          <!-- <el-input
            v-else
            v-model="data.gender"
            placeholder="性别"
            size="small"
            style="display: line; width: 30px; font-size: 10px"
          /> -->
        </div>
        <div style="font-size: 10px">
          真实姓名：<span v-if="editing == 0">{{ data.nickname }}</span
          ><el-input
            v-else
            v-model="data.nickname"
            placeholder="真实姓名"
            style="
              display: line;
              width: 70px;
              margin-right: 10px;
              font-size: 15px;
            "
          />
        </div>

        <hr style="margin: 5px; width: 100%" />
        <el-skeleton
          :rows="5"
          animated
          v-if="email == undefined || email == ''"
        />
        <div
          v-else
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
        >
          <div class="tel">
            <span style="">Tel</span>
            <span style="font-size: 20px" v-if="editing == 0">{{
              data.tel
            }}</span>
            <el-input
              v-else
              v-model="data.tel"
              placeholder="电话"
              style="display: line; width: 200px; font-size: 15px"
            />
          </div>
          <div class="tel">
            <span>Email</span>
            <span style="font-size: 20px">{{ email }}</span>
          </div>
          <div class="tel" style="margin-bottom: 0px">Intro</div>
          <div
            class="tel brief_introdetail"
            style="font-size: 15px; margin-top: 0px"
          >
            <span v-if="editing == 0">{{ data.brief_intro }}</span>
            <el-input
              v-else
              v-model="data.brief_intro"
              placeholder="简介"
              type="textarea"
              :rows="4"
              style="display: line; width: 100%; font-size: 10px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { client, getFileNameUUID } from "../assets/alioss.js";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Edit, Upload, Plus } from "@element-plus/icons-vue";
import { edituserinfo, getuserinfo } from "@/utils/api";
import Base64 from "@/utils/Base64";
export default {
  name: "Register",
  components: { Edit, Upload, Plus },
  created() {},
  mounted() {
    getuserinfo({ username: JSON.parse(Base64.decode(this.$route.query.info)).username }).then((response) => {
      if (response.data.status_code == 1) {
        this.data.nickname = response.data.nickname;
        this.data.tel = response.data.tel;
        this.data.username = JSON.parse(Base64.decode(this.$route.query.info)).username,
        this.data.avatar = response.data.avatar;
        this.data.gender = response.data.gender;
        if (response.data.gender == 0)
          this.genderimg = require("../assets/img/xingbienv.png");
        else if (response.data.gender == 1)
          this.genderimg = require("../assets/img/xingbienan.png");
        else this.genderimg = require("../assets/img/猫.png");
        this.data.brief_intro = response.data.brief_intro;
        this.email = response.data.email;
      } else ElMessage.error(response.data.message);
    });
  },

  watch: {
    '$route': {
      handler(newVal, oldVal) {
        if(newVal.path==oldVal.path)
          this.$router.go(0)
      }
      },
      deep: true,
      immediate: true,
    },
  data() {
    return {
      author:JSON.parse(Base64.decode(this.$route.query.info)).author,
      email: "",
      genderimg: require("../assets/img/猫.png"),
      editing: 0,
      data: {
        username: "",
        nickname: "",
        tel: "",
        gender: 2,
        avatar:
          "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/Transparent_Akkarin.jpg",
        brief_intro: "",
      },
    };
  },
  methods: {
    edit() {
      if (this.editing == 0) {
        this.editing = 1;
      } else {
        this.editing = 0;
        edituserinfo(this.data).then((response) => {
          if (response.data.status_code == 1) {
            ElMessage({
              message: "修改成功",
              type: "success",
            });
          } else ElMessage.error(response.data.message);
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
    updategender() {
      if (response.data.gender == 0)
        this.genderimg = require("../assets/img/xingbienv.png");
      else if (response.data.gender == 1)
        this.genderimg = require("../assets/img/xingbienan.png");
      else this.genderimg = require("../assets/img/猫.png");
    },
    uploadURL(file) {
      console.log(file.file);
      //注意哦，这里指定文件夹'image/'，尝试过写在配置文件，但是各种不行，写在这里就可以
      var fileName = "yonghutouxiang/" + getFileNameUUID() + ".jpg";
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
          this.data.avatar =
            "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName;
        });
    },
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
  flex-direction: column;

  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  backdrop-filter: blur(2rem);
  border-radius: 30px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 600px;
  width: 500px;
  overflow: hidden;
}
#up {
  flex: 1 1 30%; //180
  background-image: url(../assets/img/sllh.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border: 10px solid white;
    border-radius: 100px;
    position: absolute;
    box-shadow: 0px 15px 10px -15px lightgray;
    bottom: -50px;
    left: 150px;
  }
}
#down {
  flex: 1 1 70%;
  padding: 40px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  .tel {
    width: 80%;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  div {
    font-weight: lighter;
    font-size: 23px;
    color: #26476d;

    img {
      width: 23px;
      height: 23px;
    }
  }
}
.brief_introdetail {
  height: 80px;
  overflow-y: auto;
  text-indent: 2em;
}
::-webkit-scrollbar {
  width: 4px;
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 10px;
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
.el-button {
  background-color: #26476d;
  border: none;
}
#editbutton {
  position: absolute;
  top: 20px;
  right: 20px;
}
.el-input {
}
.avatar-uploader {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border: 10px solid white;
  border-radius: 50%;
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
</style>
