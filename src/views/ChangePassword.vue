<template>
  <div class="big">
    <div id="content">
      <div id="up">
        <img :src="data.avatar" />
      </div>
      <div id="down">
        <el-button type="primary" id="editbutton" @click="submit"
          ><el-icon><Upload /></el-icon
        ></el-button>

        <div>
          <span>{{ data.nickname }} </span>
          <img src="../assets/img/xingbienv.png" />
        </div>
        <div style="font-size: 10px">
          真实姓名：<span>{{ data.name }}</span>
        </div>
        <hr style="margin: 5px; width: 100%" />
        <div class="tel">
          <span style="">Old</span>

          <el-input
            v-model="form.oldpassword"
            placeholder="请输入旧密码"
            style="display: line; width: 200px; font-size: 15px"
          />
        </div>
        <div class="tel">
          <span>New</span>

          <el-input
            v-model="form.newpassword1"
            placeholder="请输入新密码"
            style="display: line; width: 200px; font-size: 15px"
          />
        </div>
        <div class="tel">
          <span>Confirm</span>

          <el-input
            v-model="form.newpassword2"
            placeholder="请确认新密码"
            style="display: line; width: 200px; font-size: 15px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { client, getFileNameUUID } from "../assets/alioss.js";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Edit, Upload, Plus } from "@element-plus/icons-vue";
export default {
  name: "Login",
  components: { Edit, Upload, Plus },
  data() {
    return {
      editing: 0,
      data: {
        nickname: "小七",
        name: "包新蕾",
        password: "123456",
        avatar:
          "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg",
      },
      form: {
        oldpassword: "",
        newpassword1: "",
        newpassword2: "",
      },
    };
  },
  methods: {
    submit() {
      ElMessage({
        message: this.form,
        type: "success",
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
.introdetail {
  height: 80px;
  overflow-y: scroll;
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
