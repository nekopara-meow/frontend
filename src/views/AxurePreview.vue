<template>
    <div v-if="CanPreview" class="Body">
        <div class="pageMenu">
            <el-menu :default-active="mytoString(nowpage)">
                <el-menu-item v-for="(item, Index) in pagesname"
                    :index="Index.toString()" @click="setPage(Index)">
                    <div class="menu-item">
                        <div class="menu-item-left" @dblclick="startChangePageName">
                            <el-icon><Document /></el-icon>
                            <input v-if=ChangingThisPage(Index)
                                :value = pagesname[Index]
                                @change="changePageName($event, Index)"
                                style="border:none; width: 100%;
                                    background-color: transparent;
                                    color: white;">
                            <span v-else>
                                {{ item }}
                            </span>
                        </div>
                        <el-icon><MoreFilled /></el-icon>
                    </div>
                </el-menu-item>
            </el-menu>
        </div>

        <div class="display">
            <div :style="my_table">
                <DraggableContainer 
                    referenceLineColor="#acbbdc">
                    <Vue3DraggableResizable v-for="(item, index) in pages[nowpage]"
                        :initW = item.transform.width
                        :initH = item.transform.height
                        v-model:x = item.transform.x
                        v-model:y = item.transform.y
                        v-model:w = item.transform.width
                        v-model:h = item.transform.height
                        :parent = true
                        v-model:active = item.active
                        :draggable="false"
                        :resizable="false"    
                    >

                        <div v-if = "isLable(item.type)" 
                            :style="item.style" :id="item.id"
                            @click = "myEvent(item.Event, item.jumpPage, 
                                item.boxTitle, item.boxMessage)"
                        >
                            <div> {{ item.content }} </div>
                        </div>

                        <div v-else-if="isBtn(item.type)" 
                            :style="item.style" :id="item.id"
                            @click = "myEvent(item.Event, item.jumpPage, 
                                item.boxTitle, item.boxMessage)"
                        >
                            <el-button v-if="haveColor(item.btnColor)" :type="item.btnType"
                                :round = "isBtnRound(item.shape)"
                                :circle = "isBtnCircle(item.shape)"
                                :plain = "item.plain"
                                :text = "item.text"
                                :color = "item.btnColor" padding = 0>
                                <span> {{ item.content }} </span>
                            </el-button>
                            <el-button v-else :type="item.btnType"
                                :round = "isBtnRound(item.shape)"
                                :circle = "isBtnCircle(item.shape)"
                                :plain = "item.plain"
                                :text = "item.text" padding = 0>
                                <span> {{ item.content }} </span>
                            </el-button>
                        </div>

                        <div v-else-if="isInput(item.type)" :style="item.style" :id="item.id">
                            <el-input :placeholder="item.content">
                                <template v-if="item.havePretend" #prepend>
                                    {{ item.pretend }}
                                </template>
                                <template v-if="item.haveAppend" #append>
                                    {{ item.append }}
                                </template>
                            </el-input>
                        </div>

                        <div v-else-if="isRadio(item.type)" :id="item.id">
                            <el-radio-group v-model="item.state">
                                <el-radio>
                                    {{ item.content }}
                                </el-radio>
                            </el-radio-group>
                        </div>

                        <div v-else-if="isCheckbox(item.type)" :id="item.id">
                            <el-checkbox>{{ item.content }}</el-checkbox>
                        </div>

                        <div v-else-if="isIcon(item.type)" :id="item.id"
                            @click = "myEvent(item.Event, item.jumpPage, 
                                item.boxTitle, item.boxMessage)">
                            <component
                                :is="icons[item.icon_index]"
                                :style="item.style">
                            </component>
                        </div>

                        <div v-else :style="item.style" :id="item.id"
                            @click = "myEvent(item.Event, item.jumpPage, 
                            item.boxTitle, item.boxMessage)">
                        </div>
                    </Vue3DraggableResizable>
                </DraggableContainer>
            </div>
        </div>
    </div>

    <div v-else class="root">
        <h1>有没有一种可能你404了</h1>
        <h1> 原型设计未开放</h1>
        <h2>喵呜！</h2>
    </div>
    
</template>

<style lang="scss" scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.Body{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgb(241, 241, 241, 0.95);
    .pageMenu{
        width: 20%;
        height: 100%;
        background-color: white;
    }
    .display{
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pageMenu{
        position: relative;
        overflow: hidden;
    }
    .menu-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0;
        .menu-item-left{
            display: flex;
            flex-direction: row;
            align-items: center;
            .input{
                height: 50%;
                background-color: transparent;
                border: none;
            }
        }
    }
}

.el-button{
    width: 100%;
    height: 100%;
}

</style>

<script>
import Axios from "axios"

import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { DraggableContainer } from 'vue3-draggable-resizable'

import { load_axure, viewAxure } from "@/utils/api"

import { ElDropdown, ElMenu, ElCollapse, 
    ElButton, ElRadio, ElMessage, ElScrollbar, ElMessageBox} from 'element-plus'

export default{
    components: { 
        Vue3DraggableResizable,
        DraggableContainer,

        ElDropdown, ElMenu, ElCollapse, 
        ElButton, ElRadio, ElMessage, ElScrollbar, ElMessageBox
    },
    data() {
        return {
            my_table: {
                "width": "700px",
                "height": "450px",
                "background-color": "white"
            },

            pages: [],
            pagesname: [],
            nowpage: 0,
            axure_id: 12,
            username: '',
            CanPreview: false,
        }
    },
    methods: {
        myEvent(Event, jumpPage, boxTitle, boxMessage){
            console.log('myEvent', Event, jumpPage, boxTitle, boxMessage)
            
            if(Event == 0)
                return
            else if(Event == 1)
                this.setPage(jumpPage)
            else if(Event == 2){
                ElMessageBox.alert(boxMessage, boxTitle, {
                    confirmButtonText: '确认',
                })
            }
        },
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
        isRadio(strtype){
            return strtype === "radio"
        },
        isCheckbox(strtype){
            return strtype === "checkbox"
        },
        isIcon(strtype){
            return strtype === "icon"
        },
        ChangingThisPage(index){
            return this.changingPageName && (index == this.nowpage)
        },
        setPage(index){
            this.now = null
            this.lastnow = null
            this.nowpage = index
            //this.changingPageName = false
        },
        mytoString(num){
            if(num == null)
                return null
            return num.toString()
        },
        haveColor(color){
            if(color == "" || color.length < 0)
                return false
            return true
        },
        isBtnRound(shape){
            return shape == 1
        },
        isBtnCircle(shape){
            return shape == 2
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
            if(ret == -1){
                ElMessage.error("请求方式错误")
                return 
            }

            url = response.data.axure_url
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

            url = response.data.name_url
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
                        that.pagesname = JSON.parse(text)
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
        this.username = this.$store.state.username
        console.log('created')
        viewAxure({
            axure_id: this.axure_id,
            username: this.username
        }).then((response) => {
            let ret = response.data.status_code
            console.log('ret', response.data)
            if(ret == -1){
                ElMessage.error("请求方式错误")
                return 
            }
            else if(ret == 2){
                this.CanPreview = false
                ElMessage.error("原型设计未开放")
                return 
            }
            else if(ret == 1){
                this.CanPreview = true
                this.my_table['width'] = response.data.width + "px"
                this.my_table['height'] = response.data.height + "px"
                console.log('my_table', this.my_table)
            }
        })
    },
}
</script>