<template>
  <div>uml</div>
</template>

<script>
import { upload, getFileNameUUID, readURL } from "@/utils/ali_oss";
import { save_uml, load_uml,create_uml } from "@/utils/api";

/**
 * @description: 这个文件由于iframe是在每次点击时创建并且移入到App节点下
 * 退出时，移除
 * 但是并没有清出内存
 * 所以可能存在多次点击后的性能问题
 * @author: 罗亚硕
 * @date: 2022/8/4
 */
export default {
  name: "UmlDrawer",
  data() {
    return {
      newImgData:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA5xJREFUeF7tms9rE1EQx2c2FkuzsUXx0IOgKO2hl94ET/bUbFLBJq2mXvTmvYqCF+tJClrwL/Aiekh2o2ibiAeLiNSDB0FES0tFRUSxUpqIQvJGNm0xSW0zm+yWt8nLMft98+b72dl5b38gtPgPW9w/KACqAhwQiGdytwHoGAD2OBjGkGISgNKmod9jiF2VsC+BeDY/B0RHXZ29IhhaphGMl/8Vy+a7oSjOE0EqPRR648XcLACxzK9hBGF5kUBZzFnT0AcqAEyvTqCGVwHgnUBIpMP6a7dzYAEYyeYuEcGk25NXxdsOAADQgqZpieRg8JWbebAAxP6dCTfnro5VA4AtxyUQhTEz2vnSrUR8BqBk+xNqWiI12PHCDQh+BACI+EUUxZgVDT1rFIIvAayb/kZICSscetoIBD8DsH0vCwGJdFR/Ui8EvwMAQFgRUFois/VA8D+AkmvMoygmUtE9j5xCaBIAJdt/EPF0Khx84ARCMwGwK6EAQiTMaMjkQpAawMjj/BAJesg1s6EzDZ3lq3TxcILvzE6Q5k0j1FtxL5DNdyPBLQAa5eS5psGkaQRPcfUSAQAg0g5YkY7P3OTd0MkFAOCKZejX3TDGjSEVADvpIhWO3I90LXINNKqTDsBaY6KBlBGabdQcZ7yUANZ6GWRIwFcg+sgxUq4JBNruJMPtC5xx8gLgZL+NRqO2vmRk99taYZoWAAm6ZkVDEwpADQKqAmqViH3co53gdwCYWp9/HAD2c3LhaqS/BITY1ZuOts/bhoanf/doWuE91xxHJzuATU+A45mc/WjrOMccR6MASL4KqAqofg2mLoEm7QGlpQ6B5qobV/XNzkhmdVMDFIT9qMFZIOjnNL5yjRRNsHypc2qgXB/P5MjpeBkAbGp0Tk1s6OvZiMkAADQs7kuGO5frNW6PO5n+2RVob3sOAH1O4kgBAAjuagGcqved/vpTYfurkXNOzNtaOQBsnbXaB6h9QNX3QGoj1KQboa26QMv3gIolcjS7sldQ4IfTTr+dXvZVADaWSNuEKNI4IJxpLQBuuv1PLPkrQAHwloCqAMkfiXl7+n1wL6AAeE1A9QDVA9x8OzyTu4AIN7wuWzfjE8FFK6LfrBWT9Xa43u/1ak3u5XHU8ERqMFjz01kWADvReCa3BAAHvUzaxdgfTEM/xInHBmAHi83kJhExDkCHOcF3XoOLRGRaEf0yd25HALhB/aRTAPx0trzIteUr4C8eInFfvYkbxgAAAABJRU5ErkJggg==',
      imgData:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABL5JREFUeF7tm2tsFFUUx//T7e52t0sBIy8hILVSxCAPCYogD/kglQRImhRIxIQofhCNCgkPAwEEDT5CSMCQEAIYA0GSVYzhEQJYwiuVpw+gkNryFCyFArvtzD6HnL273Wmzs87szO7MNnO/tb135p7fPed/zr23wyFNq9zXMgIF4mKI4lSA86Trm+2/3fI1VtdUlU7S+z2c3ANjxnM4AYguvV+ayfMuNTWgxFmsOwR5AAf8uyBiZiaTzcYYAkBNbwjyAPb7fEa7vRRkAoDeENIA8IvZWMlMnykFoCeEvAWgF4S8BqAHhLwHoBVCpwCgBUKnAZAphE4FIBMInQ6AWgh5A6D2/nVExajiMkJpxZg3AG75GvE40KIYgFJPyBsAQjiIhkf/QhTVFaj/5wl5A4BWlCA08Q/hD/K6hUNeAVDl/x06eys8KW21AMgeiOw3125Qy+rTWMsDrBCwNMASwVQ6YmWBbGWBKf3teG+Io+3xC07wuOFTXsvPG+LAm/3tsfH1j6NYdJLXlAgMyQKfDHNiXJ/C2MQvN0ewvEZQZASNobGJtqxGQG1zRNFYuU6GACgu5PDtWBd6uFik/VQfws6rwbSGlDg4bHjdhWI7G/N9bRC/XgtpMt7QOmBM70IsHJ5czc9PC/jzvvxqLhlZhFE9bTGDT94NY92FgGbjDQVAL5872IGpz7J4buRFfHC0NaVR0wba8U450410/TIhYkgISCe6dowLZV0LYr+qvh3Gxr/ar2w/TwHWj0teQ674XcDFB9riXvp+wwH0cRdgw/ikgev/COD4nXDbHL9+zYXSEgZod10Iu+vSa4VaLzAcAE1YmhrDUWDukVbwYRFvD3JgRikLEdIH0gm9mykAkFGLRhRhdC8mcheaIvD+E8LqV4piPxOMOYdS64NWIKYBQIZsn+yGJ57mHgZEdHOylKd33JtKA6STKe9mwxevslVPtGzEvWkB0MSqyhyoKmNxT2pPq5/NZqoQoHRIaVHafrgSxC8N2is+OYimArD1DTeo5KXWHBDRPa4Bnx7ncdOvfMOkxmNMA2D+UCcm9WUbpDONEexpCGFNPAvoXf2ZTgOk+4Ig1QGHWxCItNeDAzdC2HJJ3yKIQBjuAbQj3DTB3bYoa88JMQ9INPKCwd1ZffDN+QBq/ktWiWpc3bQasGp0EV58ihm493oI2y63X+WOgN6vbsUDQd01WDpQhnpA5XN2zH6e7fJI5EjsUrWJfQvx4VC2dT53L4Ivz+qXGg0DMOxpG5aPShY9S07xqHskr/QfveTEhGeYSO64GsTP9fqkRkMAuOMnQj3jJ0JKcr3TBmwc725LjStPC/g7zQGKUn0wBIB0NdW49MgeNnz2MvMaCpmlpwQIEW16kHMAFQPsePcFFveU8j4+1op7vHIj5pQ7MH0gK5V/ux3Gdx0OUJSufKJfTgF0LHXp9IdOgdQ26SnS5otBHLyZuR7kFIBaQ3PR3wJg3Q5bt8PW7XAqrbFuh+UUuNL6HyHrn6SUl225SOQa32HVAVYdYNUBausAc304qU0CRL+3oksXdXWAyT6d1QSAw4/eKZ5Z6gCY7OPpzAFwPESM9b5VfF4VAOpsps/n1QMQ/eC4vYhyX8kZT898AgSwel8holoSAAAAAElFTkSuQmCC',
      editor: "https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json",
      //初始化窗口的数据
      initial: "",
      name: "",
      draft: "",
      iframe: "",
      msg: null,
      username: null,
      project_id: "",
      team_id: "",
      uml_id: "",
      uml_name:null,
      fromParams:'',
      fromRoute:'',
    };
  },
  methods: {
    /**
     * @description: 编辑uml
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    edit() {
      this.iframe = document.createElement("iframe");
      this.iframe.setAttribute("id", "iframe");
      this.iframe.setAttribute("frameborder", "0");
      this.iframe.style.position = "fixed";
      this.iframe.style.left = "0px";
      this.iframe.style.top = "0px";
      this.iframe.style.height = "100%";
      this.iframe.style.width = "100%";
      this.iframe.style.zIndex = 999;
      this.iframe.src = this.editor;
      document.getElementById("app").appendChild(this.iframe);
      let iframe = document.getElementById("iframe");
      //从浏览器缓存中加载已经编辑的内容，继续编辑
      this.draft = localStorage.getItem(".draft-" + name);
      //如果缓存不为空，用JSON格式化draft缓存，debug发现draft始终为null
      if (this.draft != null) {
        this.draft = JSON.parse(this.draft);
        if (
            !confirm(
                "上次未保存版本\n时间： " +
                new Date(this.draft.lastModified) +
                "内容已经缓存。是否继续编辑？"
            )
        ) {
          this.draft = null;
        }
      }
      window.addEventListener("message", this.receive);
    },
    /**
     * @description: 页面初始化函数
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    start() {
      console.log('检查router',this.$route.params)
      this.uml_id=this.$route.params.uml_id
      let url = this.$route.params.uml_url;
      if(url){
        readURL(url, (xmlData) => {
          this.initial = xmlData;
        });
      }
    },
    /**
     * @description: 消息接受函数
     *     保存：save+export
     *     退出：exit
     *     编辑：autosave
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    receive(evt) {
      let iframe = document.getElementById("iframe");
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (evt.data.length > 0) {
        var msg = JSON.parse(evt.data);
        if (msg.event === "init") {
          console.log("执行init");
          //在本地缓存draft不为空的情况下，根据本地本地信息初始化iframe
          if (this.draft != null) {
            iframe.contentWindow.postMessage(
                JSON.stringify({
                  action: "load",
                  autosave: 1,
                  xml: this.draft.xml,
                }),
                "*"
            );
            iframe.contentWindow.postMessage(
                JSON.stringify({ action: "status", modified: true }),
                "*"
            );
          } else {
            iframe.contentWindow.postMessage(
                JSON.stringify({
                  action: "load",
                  autosave: 1,
                  xmlpng: this.initial,
                }),
                "*"
            );
          }
        } else if (msg.event === "export") {
          //选择了导出,给image设置背景
          this.imgData = msg.data;
          localStorage.setItem(
              name,
              JSON.stringify({ lastModified: new Date(), data: msg.data })
          );
          localStorage.removeItem(".draft-" + name);
          this.draft = null;
          this.close();
        } else if (msg.event === "autosave") {
          //自动保存,试验发现在每次修改uml之后被调用
          localStorage.setItem(
              ".draft-" + name,
              JSON.stringify({ lastModified: new Date(), xml: msg.xml })
          );
        } else if (msg.event === "save") {
          //手动保存
          iframe.contentWindow.postMessage(
              JSON.stringify({
                action: "export",
                format: "xmlpng",
                xml: msg.xml,
                spin: "Updating page",
              }),
              "*"
          );
          localStorage.setItem(
              ".draft-" + name,
              JSON.stringify({ lastModified: new Date(), xml: msg.xml })
          );
        } else if (msg.event === "exit") {
          //退出
          localStorage.removeItem(".draft-" + name);
          this.draft = null;
          this.close();
        }
      }
    },
    /**
     * @description: 窗口关闭时的动作
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    close() {
      console.log('close')
      window.removeEventListener("message", this.receive);
      this.iframe_class = "iframe_close";
      let url = upload("testUML", this.imgData);
      let pojo = {
        username:this.username,
        uml_id:this.uml_id,
        uml_url: url,
      };
      console.log(pojo)
      save_uml(pojo).then((res) => {
        console.log("uml已上传");
        console.log(res.data);
      })
      document.getElementById("app").removeChild(this.iframe);
      console.log('proid',this.project_id)
      this.$router.push({
        name:this.fromRoute,
        params:this.fromParams
      })
    },
    /**
     * @description: 将uml图的信息存在后端
     * @author: 罗亚硕
     * @date: 2022/8/4
     */
    saveUML() {
      let url = upload("testUML", this.imgData);
      let pojo = {
        username:this.username,
        uml_id:this.uml_id,
        uml_url: url,
      };
      console.log(pojo)
      save_uml(pojo).then((res) => {
        console.log("uml已上传");
        console.log(res.data);
      });
    },
  },
  mounted() {
    this.start();
    console.log('检查router',this.$route.params)
    this.project_id=this.$route.params.project_id
    this.username=this.$store.state.username
    window.addEventListener("hashchange", this.start);
    this.edit()
  },
  /**
   * @description: 路由进入监听
   * @author: 罗亚硕
   * @date: 2022/8/9
   */
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      console.log('to',to)
      console.log('from',from)
      vm.fromParams=from.params
      vm.fromRoute=from.name
    })
  },
  /**
   * @description: 监听路由信息
   * @author: 罗亚硕
   * @date: 2022/8/9
   */
  beforeRouteLeave(to, from) {
    //离开前 删除iframe
    function isParent (obj, parentObj){
      while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
        if (obj == parentObj){
          return true;
        }
        obj = obj.parentNode;
      }
      return false;
    }
    let app=document.getElementById("app")
    if(isParent(this.iframe,app)){
      console.log('find parant')
      document.getElementById("app").removeChild(this.iframe);
    }
    // if(this.iframe){
    //   document.getElementById("app").removeChild(this.iframe);
    // }
  },
};
</script>

<style lang="scss" scoped>
.uml_wrapper {
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
}
.uml_preview {
  /*top: 0;*/
  /*left: 0;*/
  /*width: 100%; !*相当父元素的100%是100px*!*/
  /*height: 100%; !*相当父元素的100%是100px*!*/
}
</style>
