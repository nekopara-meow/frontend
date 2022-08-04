<template>
  <div class="big">
    <div id="content">
      <el-calendar>
        <template #dateCell="{ data }">
          <!-- <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
          </p> -->
          <p
            style="
              font-size: 20px;
              font-weight: lighter;
              color: #26476d;
              padding: 0;
              margin: 0;
            "
          >
            {{ data.day.split("-").slice(2).join("-") }}
          </p>
          <div
            style="
              font-size: 10px;
              font-weight: lighter;
              color: #26476d;
              padding: 0;
              margin: 0;
            "
            v-for="i in check(
              data.day.split('-').slice(1, 2).join('-'),
              data.day.split('-').slice(2).join('-')
            )"
          >
            {{ i }}
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";

export default {
  name: "Calendar",
  components: {},
  data() {
    return {
      ans: [],
      calendarData: [
        { month: 8, day: 5, thing: "第一次答辩" },
        { month: 8, day: 5, thing: "七夕第二天" },
        { month: 8, day: 12, thing: "我是傻逼" },
        { month: 8, day: 3, thing: "秋月生日" },
      ],
    };
  },
  methods: {
    check(a, b) {
      this.ans = [];
      let len = this.calendarData.length;
      let i = 0;
      for (i = 0; i < len; i++) {
        if (
          this.calendarData[i].month == parseInt(a) &&
          this.calendarData[i].day == parseInt(b)
        ) {
          this.ans.push(this.calendarData[i].thing);
        }
      }
      return this.ans;
      return ["neow", "!23"];
    },
  },
};
</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
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
  padding: 13px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 90%;
  width: 85%;
  overflow-y: scroll;
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
</style>
