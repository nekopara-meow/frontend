<template>
  <div class="tab-container">
    <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
    >添加</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
          :model="questionForm"
          ref="dataForm"
          label-position="left"
          label-width="90px"
          style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="题目" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.questionContent"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-radio-group v-model="questionForm.questionCategory" style="margin-right:12px;">
            <el-radio v-for="(radio, index) in subjectList" :key="index" :label="radio">{{radio}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="正确答案" prop="correctAnswer">
          <el-input v-model="questionForm.correctAnswer" />
        </el-form-item>
        <el-form-item label="其他答案1" prop="otherAnswer1">
          <el-input v-model="questionForm.otherAnswer1" />
        </el-form-item>
        <el-form-item label="其他答案2" prop="otherAnswer2">
          <el-input v-model="questionForm.otherAnswer2" />
        </el-form-item>
        <el-form-item label="其他答案3" prop="otherAnswer3">
          <el-input v-model="questionForm.otherAnswer3" />
        </el-form-item>
        <el-form-item label="所属年级">
          <el-select
              v-model="questionForm.userGrades"
              class="filter-item"
              placeholder="选择年级"
              multiple
          >
            <el-option
                v-for="item in tabMapOptions"
                :key="item.key"
                :label="item.label"
                :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=" createData() ">确定</el-button>
      </div>
    </el-dialog>
    <div>
      <div>
        <el-collapse-item
            title="小学期项目"
            name="1"
            style="font-size: 20px; font-weight: lighter"
        >
          <el-dropdown
              trigger="contextmenu"
              v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          >
            <div class="oneitem">
              <img src="..\assets\img\fileicons\Word.png" />
              <div>少年阿宾.txt</div>
              <div style="font-size: smaller; margin-top: 2px">
                2022/8/3
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
            title="软工项目"
            name="2"
            style="font-size: 20px; font-weight: lighter"
        >
          <el-dropdown
              trigger="contextmenu"
              v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          >
            <div class="oneitem">
              <img src="..\assets\img\fileicons\txt.png" />
              <div>少年阿宾.txt</div>
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
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      subjectList: ["黄金", "白银", "钻石"],
      input: "",
      tabMapOptions: [
        { label: "幼儿园", key: "kinderGarten" },
        { label: "一年级", key: "firstGrade" },
        { label: "二年级", key: "secondGrade" },
        { label: "三年级", key: "threeGrade" },
        { label: "四年级", key: "fourthGrade" },
        { label: "五年级", key: "fifthGrade" },
        { label: "六年级", key: "sixGrade" },
        { label: "小学以上", key: "gradeSchool" },
      ],

      questionForm: {
        questionContent: "",
        correctAnswer: "",
        otherAnswer1: "",
        otherAnswer2: "",
        otherAnswer3: "",
        userGrades: [],
        questionCategory: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    handleCreate() {
      this.questionForm = {
        questionContent: "",
        correctAnswer: "",
        otherAnswer1: "",
        otherAnswer2: "",
        otherAnswer3: "",
        userGrades: [],
        questionCategory: "",
      };
      this.dialogFormVisible = true;
    },
    //添加增加题目
    async createData() {
      const params = this.questionForm;
      alert(JSON.stringify(params))

      //如果需要调用接口，请打开注释
      //   const res = await saveSubject(params);
      //   console.log(res);
      //   if (res.code === "0000") {
      //     this.$message({
      //       type: "info",
      //       message: "保存成功",
      //     });
      //     this.dialogFormVisible = false;
      //     this.getQuerySubjectList();
      //     return;
      //   }
      //   this.$message({
      //     type: "error",
      //     message: "保存失败",
      //   });
    },
  },
};
</script>
<style scoped>
</style>

