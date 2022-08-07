<template>
  <div class="big">
    <el-dialog v-model="dialogFormVisible1" title="邀请成员" width="30%" center style="background: red;z-index:9999">
      <el-form :model="newfile">
        <el-form-item label="文件名称">
          <el-input v-model="newfile.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="newfile.type" placeholder="选择文件类型">
            <el-option label="文本文档" value="0" />
            <el-option label="原型设计" value="1" />
            <el-option label="UML图" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
                  <span class="dialog-footer">
          <el-button
              @click="this.dialogFormVisible1 = false"
              style="background-color: white"
          >Cancel</el-button
          >
          <el-button type="primary" @click="this.dialogFormVisible1 = false"
          >Confirm</el-button
          >
        </span>
        </div>
      </template>
    </el-dialog>
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex">
            <h2 class="title gradient">NEKOPARA</h2>
            <nav>
              <a
                @click="
                  () => {
                    this.tab = 'tab-0';
                  }
                "
                >概览</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-1';
                  }
                "
                >文件</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-2';
                  }
                "
                >需求</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-3';
                  }
                "
                >迭代</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-4';
                  }
                "
                >统计</a
              >
              <div class="animation" :class="tab"></div>
            </nav>
          </div>
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
          <div class="buttons">
            <el-dropdown style="margin-right: 30px">
              <el-button type="primary"
                ><el-icon><Sort /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-button type="primary"
              ><el-icon><Plus /></el-icon
            ></el-button>
          </div>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />
        <div id="leftdown1" v-if="tab === 'tab-0'">
          <div id="leftdown1left">
            <div style="display: flex; justify-content: space-between">
              <h2 class="bluelight">项目信息</h2>
              <el-button type="primary" style="margin-right: 30px"
                ><el-icon><Filter /></el-icon
              ></el-button>
            </div>

            <hr style="margin: 5px; margin-bottom: 20px" />
            <span class="bluelight">团队：猫娘乐园</span>
            <span class="bluelight">创建人：{{ data.creator }}</span
            ><span style="font-size: 13px" class="bluelight"
              >创建于{{ data.createtime }}</span
            >

            <div
              class="intro bluelight"
              v-if="editing == 0"
              style="margin-top: 10px"
            >
              {{ data.intro }}
            </div>
            <el-input
              v-else
              v-model="data.brief_intro"
              placeholder="简介"
              type="textarea"
              :rows="4"
              style="display: inline; width: 200px; font-size: 10px"
            />
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
              "
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
                <el-progress
                  status="success"
                  :percentage="50"
                  :show-text="false"
                >
                </el-progress>
              </div>
              <div class="pg" style="height: 100%; flex: 0 1 35%">
                <span class="bluelight" style="font-size: 13px">未完成</span>
                <span class="bluelight" style="font-size: 30px">11</span>
                <el-progress
                  status="warning"
                  :percentage="50"
                  :show-text="false"
                >
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
        <div id="leftdown" v-if="tab == 'tab-1'">
          <el-collapse
            v-model="activeNames"
            @change="handleChange"
            style="border: none"
            class="onegroup"
          >
            <el-collapse-item
              title="文本文件"
              name="1"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown
                trigger="contextmenu"
                v-for="(i,index) in this.doc_file"
              >
                <div class="oneitem" v-if="index<this.docNumber-1">
                  <co-editor :username="this.username"
                             :doc_id="i.file_id"
                             :prject_id="this.project_id"></co-editor>
                  <div>{{i.file_name}}</div>
                  <div style="font-size: smaller; margin-top: 2px">
<!--                    2022/8/3-->
                    {{i.creator}}
                  </div>
                </div>
                <div class="oneitem" v-else>
                  <co-editor :is-new="true"></co-editor>
                  <div>新建文档</div>
                  <div style="font-size: smaller; margin-top: 2px">
                    {{this.$store.state.username}}
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
              title="UML文件"
              name="2"
              style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown
                trigger="contextmenu"
                v-for="(i,index) in this.uml_file"
              >
                <div class="oneitem" v-if="index<this.umlNumber-1">
                  <UMLEditor :pro_id="this.project_id"
                             :uml_id="i.file_id"
                             :username="this.username"></UMLEditor>
                  <div>{{ i.file_name }}</div>
                  <div style="font-size: smaller; margin-top: 2px">
<!--                    2022/8/3-->
                    {{i.creator}}
                  </div>
                </div>
                <div class="oneitem" v-else>
                  <UMLEditor :is-new="true" :pro_id="this.project_id"></UMLEditor>
                  <div>{{ i.file_name }}</div>
                  <div style="font-size: smaller; margin-top: 2px">
                    {{this.$store.state.username}}
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="del_uml(i.file_id)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-collapse-item>
            <hr style="margin: 5px" />
            <el-collapse-item
                title="原型设计"
                name="3"
                style="font-size: 20px; font-weight: lighter"
            >
              <el-dropdown
                  trigger="contextmenu"
                  v-for="(i,index) in this.axure_file"
              >
                <div class="oneitem" v-if="index<this.axureNumber-1">
                  <axure-editor ></axure-editor>
                  <div>{{ i.file_name }}</div>
                  <div style="font-size: smaller; margin-top: 2px">
                    <!--                    2022/8/3-->
                    {{i.creator}}
                  </div>
                </div>
                <div class="oneitem" v-else>
                  <axure-editor :is-new="true"></axure-editor>
                  <div>{{ i.file_name }}</div>
                  <div style="font-size: smaller; margin-top: 2px">
                    {{this.$store.state.username}}
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item >删除</el-dropdown-item>
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
import { Filter, Sort, Plus, CaretBottom } from "@element-plus/icons-vue";
import UMLEditor from "@/components/UMLEditor";
import CoEditor from "@/components/CoEditor";
import {get_docfile,get_umlfile,del_uml,del_doc} from "@/utils/api";
import AxureEditor from "@/components/axureEditor";

export default {
  name: "workspace",
  components: {AxureEditor, CoEditor, UMLEditor, Filter, Sort, Plus, CaretBottom },
  props:{

  },
  data() {
    return {
      project_id:'114514',
      tab: "tab-0",
      dialogFormVisible1: false,
      editing: 0,
      data: {
        creator: "刘华阳",
        createtime: "2022/8/5",
        avatar:
          "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg",
        intro:
          "你若去往「绝云间」，便替我采来一束[清心」吧。一束就好。此行的旅费.啊，差些忘了，「契约」生效期间，旅费由你代为垫付。那就有劳了你说，归离原的少年仙人.啊.直至今日，他仍在履行他的职责.哦，这副「连理镇心散」，请替我带给他。对了，可千万不能让小派蒙偷吃了去，这里的药力.绝非常人所能承受。",
      },
      newfile: {
        name: "",
        type: "",
      },
      uml_file:[{
        file_id:1919,
        file_name:'示例文件',
        creator:'列车头'
      },{
        file_id:810,
        file_name:'示例文件',
        creator:'列车头'
      }
      ],
      doc_file:[{
        file_id:1919,
        file_name:'示例文件',
        creator:'列车头'
      },{
        file_id:810,
        file_name:'示例文件',
        creator:'列车头'
      }],
      axure_file:[{
        file_id:1919,
        file_name:'示例文件',
        creator:'列车头'
      },{
        file_id:810,
        file_name:'示例文件',
        creator:'列车头'
      }],
      username:this.$store.state.username,
    };
  },
  methods:{
    load_uml_info(){
      get_umlfile({
        username:this.$store.state.username,
        project_id: this.project_id,
      }).then((res)=>{
        this.uml_file.concat(res.data.ans_list)
        console.log('加载uml文件成功')
        console.log(this.uml_file)
      })
    },
    load_doc_info(){
      get_docfile({
        username:this.$store.state.username,
        project_id: this.project_id,
      }).then((res)=>{
        this.doc_file.concat(res.data.ans_list)
        console.log('加载doc文件成功')
        console.log(this.doc_file)
      })
    },
    del_doc(docID){
      del_doc({
        doc_id:docID
      }).then(res=>{
        this.load_doc_info()
      })
    },
    del_uml(umlID){
      del_doc({
        uml_id:umlID
      }).then(
          (res)=>{
            this.load_uml_info()
        }
      )
    }
  },
  mounted() {
    this.load_doc_info()
    this.load_uml_info()
    if(this.$route.params.project_id) {
      this.project_id = this.$route.params.project_id
    }
  },
  computed:{
    umlNumber(){
      return this.uml_file.length
    },
    docNumber(){
      return this.doc_file.length
    },
    axureNumber(){
      return this.axure_file.length
    }
  }
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
.el-progress--line {
  margin-bottom: 15px;
  width: 80px;
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
.bluelight {
  font-weight: lighter;
  font-size: 20px;
  color: #26476d;
}
.gradient {
  background-image: linear-gradient(90deg, #4facfe, #7bd4fe, #6acaf7, #4facfe);
  background-size: 200%;
  animation: streamer 5s linear infinite;
  //background-clip: text;
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
  width: 60px;
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
  width: 60px;
  left: 0px;
}
.tab-1,
nav a:nth-child(2):hover ~ .animation {
  width: 60px;
  left: 60px;
}
.tab-2,
nav a:nth-child(3):hover ~ .animation {
  width: 60px;
  left: 120px;
}
.tab-3,
nav a:nth-child(4):hover ~ .animation {
  width: 60px;
  left: 180px;
}
.tab-4,
nav a:nth-child(5):hover ~ .animation {
  width: 60px;
  left: 240px;
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
#leftdown1 {
  display: flex;
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
.el-button {
  background-color: #26476d;
  border: none;
}
.intro {
  font-size: 14px;
  width: 200px;
  text-indent: 2em;
}
.pg {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.185),
    rgba(255, 255, 255, 0.042)
  );
  backdrop-filter: blur(1rem);
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.696);
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
