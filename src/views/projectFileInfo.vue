<template>
  <div id="leftdown">
    <el-collapse
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
</template>

<script>
export default {
  name: "projectFileInfo"
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/projectDetail";
</style>