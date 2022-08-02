<template>
<h1 >
  {{name}}
</h1>
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
</template>

<script>
import {reactive, toRef, toRefs} from "vue";

export default {
  name: "ceshi",
  setup(){
    const data=reactive({
      name: 'you'
    })
    return{
    ...toRefs(data)
    }
  }
}
</script>

<style scoped>

</style>