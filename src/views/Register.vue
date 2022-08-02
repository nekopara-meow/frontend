<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div id="content">
      <h1 class="intro">注册</h1>
      <el-form :model="form" :rules="rules" class="login-box">
        <el-form-item label="账号" class="intro" prop="name">
          <el-input
            type="text"
            placeholder="请输入用户名"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" class="intro" prop="password1">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password1"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="intro" prop="password2">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="form.password2"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" class="intro" prop="tel">
          <el-input
            type="text"
            placeholder="请输入电话号码"
            v-model="form.tel"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" class="intro" prop="email">
          <el-input
            type="text"
            placeholder="请输入邮箱"
            v-model="form.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="intro" prop="verify">
          <el-input
            class="bind_code_input"
            v-model="form.verify"
            type="text"
            placeholder="验证码"
          />
          <el-button
            @click.native.prevent="bindforgetSendCode"
            class="codebtn"
            style="border-radius: 0"
            :disabled="disabled"
            >{{ btnText }}</el-button
          >
        </el-form-item>
        <el-form-item id="submitcontain">
          <el-button
            class="button"
            @click="submitForm('form')"
            style="font-weight: bold; font-size: 20px"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <span>
        <router-link
          to="/login"
          class="intro"
          style="float: right; font-size: medium"
          >登录帐号</router-link
        >
      </span>
    </div>
  </div>
</template>

<script>

import {loginApi, registerApi} from "@/utils/api";
import store from "@/store";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password1: "",
        password2: "",
        //email: "",
       // verify: "",
        //tel: "",
      },
      btnText: "获取验证码",
      disabled: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        verify: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /*bindforgetSendCode() {
      this.$refs["form"].validateField("email", (errorMessage) => {
        if (errorMessage) {
          if (!this.checkEmail(this.form.email)) {
            ElMessage.error("邮箱格式不正确");
            return;
          }
          Axios.post(
            "http://47.108.192.247:90/api/user/register/email",
            {
              email: this.form.email,
            },
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" }, //加上这个
            }
          ).then((response) => {
            console.log(response);
            let ret = response.data.result;
            if (ret == 0) {
            } else ElMessage.error("验证码发送失败" + response.data.message);
          });
          this.disabled = true;
          this.btnText = "请稍候...";
          setTimeout(() => {
            this.doLoop(60);
          }, 500);
          return true;
        } else {
          ElMessage.error("请输入邮箱");
          return false;
        }
      });
    },*/

    /*doLoop: function (seconds) {
      seconds = seconds ? seconds : 60;
      this.btnText = seconds + "s后获取";
      let countdown = setInterval(() => {
        if (seconds > 0) {
          this.btnText = seconds + "s后获取";
          --seconds;
        } else {
          this.btnText = "获取验证码";
          this.disabled = false;
          clearInterval(countdown);
        }
      }, 1000);
    },
    checkEmail(value) {
      return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
        value
      );
    },*/
    submitForm() {
      /*this.$refs.form.validate((valid) => {
        if (valid == false) {
          ElMessage.error("请填写信息");
          return;
        }
      });*/
      /*if (this.form.password1 != this.form.password2) {
        ElMessage.error("两次密码不一致");
        return;
      }*/
      registerApi(data.form)
          .then((response) => {
        console.log(response);
        let ret = response.data.status_code;
        if (ret == 1) {
          store.commit('setToken',response.data.token)
          store.commit('setUsername',response.data.username)
          ElMessage({
            message: "注册成功",
            type: "success",
          });
        } else ElMessage.error("注册失败" + response.data.message);
      });
    },
  },
};
</script>

<style scoped>
.intro {
  font-weight: 700;
  font-size: 40px;
  font-family: "思源黑体 CN";
  background-image: linear-gradient(
    90deg,
    rgb(255, 167, 69),
    rgb(254, 134, 159),
    rgb(239, 122, 200),
    rgb(160, 131, 237),
    rgb(67, 174, 255),
    rgb(160, 131, 237),
    rgb(239, 122, 200),
    rgb(254, 134, 159),
    rgb(255, 167, 69)
  );
  background-size: 200%;
  animation: streamer 5s linear infinite;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
}
@keyframes streamer {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
.button {
  background-image: linear-gradient(
    90deg,
    rgb(255, 167, 69),
    rgb(254, 134, 159),
    rgb(239, 122, 200),
    rgb(160, 131, 237),
    rgb(67, 174, 255),
    rgb(160, 131, 237),
    rgb(239, 122, 200),
    rgb(254, 134, 159),
    rgb(255, 167, 69)
  );
  background-size: 200%;
  animation: streamer 5s linear infinite;
  background-clip: text;
  color: transparent;
  border-radius: 20px;
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
  padding: 50px;
  padding-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 70%;
  width: 400px;
}
#submitcontain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 3em;
}
.codebtn {
  border-radius: 0;
  position: absolute;
  top: 0;
  right: 0px;
  font-size: 11px;
  font-weight: 500;

  line-height: 15px;
  cursor: pointer;
  padding-left: 10px;
  border: 0px;
  border-left: 1px solid lightgray;
  background-color: transparent;
}
.codebtn:hover {
  border: 0px;
  border-left: 1px solid lightgray;
  background-color: transparent;
}
.bind_code {
  width: 279.5px;
  height: 35px;
  position: relative;
}

.el-input {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.el-button {
  height: 100%;
  width: 100px;
  border-radius: 10px;
}
</style>
