<template>
    <div class="Body">
        <div class="pageMenu"></div>
        <div class="display">
            <div class="my-table">
                <DraggableContainer referenceLineColor="#acbbdc">
                    <Vue3DraggableResizable v-for="(item, index) in pages[nowpage]"
                        :initW = item.transform.width
                        :initH = item.transform.height
                        v-model:x = item.transform.x
                        v-model:y = item.transform.y
                        v-model:w = item.transform.width
                        v-model:h = item.transform.height
                        :parent = true
                        :draggable = false
                        :resizable = false>
                        <div v-if = "isLable(item.type)" :style="item.style" :id="item.id">
                            <span> {{ item.content }} </span>
                        </div>
                        <div v-else-if="isBtn(item.type)" :style="item.style" :id="item.id">
                            <el-button :type="item.btnType" @dblclick="editLable" padding = 0>
                                <span> {{ item.content }} </span>
                            </el-button>
                        </div>
                        <div v-else-if="isInput(item.type)" :style="item.style" :id="item.id">
                            <el-input :placeholder="item.content" 
                                prefix-icon="Search">
                                <template v-if=havePretend(index) #prepend>
                                    {{ item.pretend }}
                                </template>
                                <template v-if="haveAppend(index)" #append>
                                    {{ item.append }}
                                </template>
                            </el-input>
                        </div>
                        <div v-else :style="item.style" :id="item.id">
                        </div>
                    </Vue3DraggableResizable>
                </DraggableContainer>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.Body{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgb(241, 241, 241, 0.95);
    .pageMenu{
        width: 20%;
        height: 100%;
        background-color: red;
    }
    .display{
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .my-table{
            width: 700px;
            height: 450px;
            background-color: white;
        }
    }
}

</style>

<script>
import Axios from "axios"

import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { DraggableContainer } from 'vue3-draggable-resizable'

import { load_axure } from "@/utils/api"

export default{
    components: { 
        Vue3DraggableResizable,
        DraggableContainer
    },
    data() {
        return {
            pages: [],
            nowpage: 0,
            axure_id: 12,
        }
    },
    methods: {
        havePretend(index){
            let item = this.pages[this.nowpage][index]
            return item.pretend != undefined && item.pretend != null
                && item.pretend.length > 0
        },
        haveAppend(index){
            let item = this.pages[this.nowpage][index]
            
            return item.append != undefined && item.append != null
                && item.append.length > 0
        },
        isLable(strtype){
            return strtype === "lable"
        },
        isBtn(strtype){
            return strtype === "btn"
        },
        isInput(strtype){
            return strtype === "input"
        },
    },
    mounted() {
        let url = ""
        let that = this

        /*console.log('load_axure',{
            axure_id: that.axure_id,
        })*/

        load_axure({
            axure_id: that.axure_id
        }).then((response) => {
            //console.log('response QAQ')
            //console.log(response.data)

            let ret = response.data.status_code
            if(ret == -1)
                ElMessage.error("请求方式错误")
            else{
                //console.log('response')
                //console.log(response.data.axure_url)
                url = response.data.axure_url
            }
            Axios({
                method: 'get',
                url, responseType: 'blob',
                transformResponse: [function (data) {
                    let reader = new FileReader()
                    reader.readAsText(data, 'UTF-8')
                    reader.onload = function () {
                        //此处便是返回值
                        let text = reader.result
                        //console.log(text)
                        that.pages = JSON.parse(text)
                        //console.log(that.pages)
                    }
                    return data
                }]
            }).then(res => {
                console.log('res')
            })
        })
        //console.log('pageURL', url)
    },
    created(){
        this.axure_id = this.$route.query.axure_id
    },
}
</script>