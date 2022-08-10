<template>
<div>
  <el-tooltip
      :content="tip"
      raw-content
      placement="left-start"
  >
    <div>
      <div :class="getClass" > 项目名：{{project_name}} </div>
<!--      <hr style="margin: 5px" />-->
    </div>
  </el-tooltip>
</div>
</template>

<script>
export default {
  name: "proPreview",
  props:{
    project_name:'',
    brief_intro:'',
    team_name:'',
    focus_project_id:'',
    project_id:'',
  },
  computed:{
    tip(){
      let info=this.brief_intro
      if(info!=null){
        if(info.length>15){
          info=info.slice(0,14)
          info+='...'
        }
      }
      return '所属团队:'+this.team_name+'<br/>'+'项目简介:'+info
    },
    getClass(){
      console.log(this.project_id,this.focus_project_id)
       if(this.project_id===this.focus_project_id){
         return 'is-focused'
       }
       return 'pro-name'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: bisque;
  height: 50px;
  width: 100%;
  overflow: hidden;
  padding: 0;
}
.pro-name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-color: #c2e9fb;

  background: #c2e9fb;
  font-size: 16px;
  padding-left: 10px;
  width: 100%;
  transition: background 0.3s;
  color: #26476d;
  height: 100%;
}
::v-deep .el-tooltip__trigger {
  background-color: coral;
  height: 100%;
  line-height: 50px;
}
.pro-name:hover {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #26476d;
  color: white;
  border-color: black;
  height: 100%;
  padding-left: 10px;
}
.is-focused {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: solid;

  font-size: 16px;
  height: 100%;
  width: 100%;
  transition: background 0.3s;
  background: #26476d;
  color: white;
  border-color: black;
  height: 100%;
  padding-left: 10px;
}
</style>