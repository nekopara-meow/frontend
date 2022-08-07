<template>
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
</template>

<script>
export default {
  name: "addFile"
}
</script>

<style scoped>

</style>