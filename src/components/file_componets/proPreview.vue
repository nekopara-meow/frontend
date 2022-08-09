<template>
<div>
  <el-tooltip
      :content="tip"
      raw-content
      placement="left-start"
  >
    <div>
      <div :class="getClass" > 项目名：{{project_name}} </div>
      <hr style="margin: 5px" />
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
      if(info.length>15){
        info=info.slice(0,14)
        info+='...'
      }
      return '团队名:'+this.team_name+'<br/>'+'团队简介:'+info
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
.pro-name{
  margin: 10px;
  padding: 3px;
  border: solid;
  border-color: #c2e9fb;
  border-radius: 5px;
  background: #c2e9fb;
  font-size: 16px;
  height: 100%;
  width: 16em;
  transition:background .3s;
  color: #26476d;
}
.pro-name:hover{
  background: #26476d;
  color: white;
  border-color: black;
}
.is-focused{
  margin: 10px;
  padding: 3px;
  border: solid;
  border-radius: 5px;
  font-size: 16px;
  height: 100%;
  width: 16em;
  transition:background .3s;
  background: #26476d;
  color: white;
  border-color: black;
}
</style>