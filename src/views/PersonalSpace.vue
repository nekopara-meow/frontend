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
          v-if="editing == 0"
          type="primary"
          id="editbutton"
          @click="edit"
          ><el-icon><Edit /></el-icon
        ></el-button>
        <el-button v-else type="primary" id="editbutton" @click="edit"
          ><el-icon><Upload /></el-icon
        ></el-button>
        <div>
          <span v-if="editing == 0">{{ data.nickname }} </span
          ><el-input
            v-else
            v-model="data.nickname"
            placeholder="昵称"
            style="
              display: line;
              width: 70px;
              margin-right: 10px;
              font-size: 15px;
            "
          />
          <img v-if="editing == 0" :src="genderimg" />
          <el-input
            v-else
            v-model="data.gender"
            placeholder="性别"
            size="small"
            style="display: line; width: 30px; font-size: 10px"
          />
        </div>
        <div style="font-size: 10px">
          用户名：<span >{{ data.username }}</span>
        </div>
        <hr style="margin: 5px; width: 100%" />
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
          <span style="font-size: 20px" >{{
            email
          }}</span>
        </div>
        <div class="tel" style="margin-bottom: 0px">brief_intro</div>
        <div class="tel brief_introdetail" style="font-size: 15px; margin-top: 0px">
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
</template>

<script>
import { client, getFileNameUUID } from "../assets/alioss.js";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Edit, Upload, Plus } from "@element-plus/icons-vue";
import {edituserinfo, getuserinfo} from "@/utils/api";
export default {
  name: "Login",
  components: { Edit, Upload, Plus },
  created() {
    getuserinfo({username:this.$store.state.username}).then((response)=>{console.log(response.data);
      if(response.data.status_code==1){
        this.data.nickname=response.data.nickname
        this.data.tel=response.data.tel
        this.data.username=this.$store.state.username
        this.data.avatar=response.data.avatar
        this.data.gender=response.data.gender
        if(response.data.gender==0)
        this.genderimg=require( '../assets/img/xingbienv.png');
        else this.genderimg=require( '../assets/img/xingbienan.png');
        console.log(this.genderimg)
        this.data.brief_intro=response.data.brief_intro
        this.email=response.data.email
  }
      else
        ElMessage.error(response.data.message);
    }
    )

  },
  mounted() {
    this.updategender();
  },

  watch: {
    "data.gender"() {
      // console.log("changed!");
      this.updategender();
    },
  },
  data() {
    return {
      email: "sss",
      genderimg: require('../assets/img/xingbienv.png'),
      editing: 0,
      data: {
        username:"包新蕾",
        nickname: "小七",
        tel: "13947354199",
        gender: 1,
        avatar:
          "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg",
        brief_intro:
          "你若去往「绝云间」，便替我采来一束[清心」吧。一束就好。此行的旅费.啊，差些忘了，「契约」生效期间，旅费由你代为垫付。那就有劳了你说，归离原的少年仙人.啊.直至今日，他仍在履行他的职责.哦，这副「连理镇心散」，请替我带给他。对了，可千万不能让小派蒙偷吃了去，这里的药力.绝非常人所能承受。",
      },
    };
  },
  methods: {
    edit() {
      if (this.editing == 0){
        this.editing = 1;
      } else {
        this.editing = 0;
        console.log(this.data),
        edituserinfo((this.data)).then((response)=>{console.log(response.data);
              if(response.data.status_code==1){
                ElMessage({
                  message: "修改成功",
                  type: "success",
                });
              }
              else
                ElMessage.error(response.data.message);
            }
        );
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
    updategender(){
      if(this.data.gender==0)
        this.genderimg=require( '../assets/img/xingbienv.png');
      else this.genderimg=require( '../assets/img/xingbienan.png');
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
