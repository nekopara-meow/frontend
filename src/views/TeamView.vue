<template>
  <div id="team" >
    <div style="display: flex;">
      <div style="flex: 3"></div>
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
      >
        <el-menu-item class="menufont" index="0" >我参与的团队</el-menu-item>
        <el-menu-item class="menufont" index="1">我管理的团队</el-menu-item>
        <el-sub-menu class="menufont" index="2" popper-class="submenu">
          <template #title><div>新增团队</div></template>
          <el-menu-item index="2-1" @click="creatteam">创建</el-menu-item>
          <el-menu-item index="2-2" >申请加入</el-menu-item>
        </el-sub-menu>
      </el-menu>
      </div>
      <div style="display: flex;
		  flex-wrap: wrap;transform-origin: left top;
		   width: 100%;margin-left:30px">
        <el-col :span="2" v-for="(o, index) in 2" :key="o" style="margin: 60px 40px;">
          <el-card shadow="hover" :body-style="{padding:'0px'}" class="card">
            <img src="@/assets/img/team.png" class="image">
            <div style="padding: 14px;">
              <span>喵喵喵</span>
              <div class="bottom clearfix">
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="2"  style="margin: 60px 40px;">
          <el-card shadow="hover" :body-style="{padding:'0px'}" class="card">
            <el-icon ><Plus /></el-icon>
            <div style="padding: 14px;">
              <span>喵喵喵</span>
              <div class="bottom clearfix">
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    <div>
      <el-dialog :visible.sync="form.dialogFormVisible">
        <el-form
            ref="ruleFormRef"
            :model="form"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
          <el-form-item label="Activity name" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Activity zone" prop="region">
            <el-select v-model="form.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Activity count" prop="count">
            <el-select-v2
                v-model="form.count"
                placeholder="Activity count"
                :options="options"
            />
          </el-form-item>
          <el-form-item label="Activity time" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                    v-model="form.date1"
                    type="date"
                    label="Pick a date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                    v-model="form.date2"
                    label="Pick a time"
                    placeholder="Pick a time"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="form.delivery" />
          </el-form-item>
          <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="Online activities" name="type" />
              <el-checkbox label="Promotion activities" name="type" />
              <el-checkbox label="Offline activities" name="type" />
              <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="Sponsorship" />
              <el-radio label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form" prop="desc">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(form)"
            >Create</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from 'vue'
export default {
  setup(){
    const data=reactive({
      dialogFormVisible:true,
      form:{
      name: 'Hello',
      region: '',
      count: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''},
      rules:{
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
          region: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
        count: [
      {
        required: true,
        message: 'Please select Activity count',
        trigger: 'change',
      },
    ],
        date1: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],
        date2: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a time',
        trigger: 'change',
      },
    ],
        type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
        resource: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change',
      },
    ],
        desc: [
      { required: true, message: 'Please input activity form', trigger: 'blur' },
    ]
      }

    })
  const activeIndex = ref('1')
  const handleSelect = (index) => {
    //console.log(key, keyPath)
  }
  const submitForm=()=>{

  }
  const creatteam= () => {
      data.dialogFormVisible=true;
      console.log("zhanshi",data.dialogFormVisible)
  }
  return{
      ...toRefs(data),
    creatteam,
    submitForm,
  }
  }
}
</script>

<style>
.card{
  background: rgba(255,255,255,0.6);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgb(38 38 38 / 10%);
  transition: all 0.3s cubic-bezier(0.44, 0.9, 0.6, 0.94);
}
.el-menu-demo{
  flex: 1;
  display: flex;
  background: rgba(255,255,255,0.5);
}
.menufont{
  font-family: 黑体;
  font-size: 18px;
  flex: 1;
  --el-dialog-font-line-height: 1.7;
  opacity: 0.7;
}
.flex-grow {
  flex-grow: 1;
}
.time {
  font-size: 13px;
  color: #999;
}

.button {
  display: block;
  padding: 0;
  float: right;
  opacity: 1;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>