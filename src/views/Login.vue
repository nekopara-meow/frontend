<template>
  <div class="big">
    <div id="content">
      <h1 class="intro">登录</h1>
      <el-form :model="form" :rules="rules" class="login-box">
        <el-form-item label="账号" class="intro" prop="username">
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" class="intro" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item id="submitcontain">
          <el-button
            class="button"
            style="font-weight: bold; font-size: 20px"
            @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <span>
        <router-link
          to="/register"
          class="intro"
          style="text-align: right; font-size: medium"
          >注册账号</router-link
        >
      </span>
    </div>
  </div>
</template>

<script>
// https://blog.csdn.net/m0_58039950/article/details/124721115
import { login } from "@/utils/api";
import { reactive, toRef, toRefs } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { useRouter } from "vue-router/dist/vue-router";
import { useStore } from "vuex";
export default {
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    });
    const submitForm = () => {
      login(data.form)
        .then((response) => {
          let ret = response.data.status_code;
          if (ret == 1) {
            store.commit("setToken", response.data.token);
            store.commit("setUsername", response.data.username);
            //store.commit("setHead",response.data.head);
            ElMessage({
              message: "登录成功，即将跳转到主页",
              type: "success",
            });
            router.push({
              path: "/",
            });
          } else ElMessage.error(response.data.message);
        })
        .catch((error) => {
          // 请求失败处理
          ElMessage.error("网络有错误噢");
        });
    };
    return {
      ...toRefs(data),
      submitForm,
    };
  },
};
</script>

<style scoped>
.big {
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro {
  font-weight: 700;
  font-size: 40px;

  margin-bottom: 20px;
  color: #26476d;
  text-indent: 0;
  width: 100%;
}

.button {
  color: #26476d;
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
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 70%;
  width: 400px;
  align-items: center;
}
#submitcontain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 3em;
}
.el-form {
  width: 100%;
}
.el-form-item {
  margin-top: 38px;
  width: 100%;
}
.el-input {
  height: 100%;
}
.el-button {
  height: 100%;
  width: 100px;
  border-radius: 10px;
}
</style>
