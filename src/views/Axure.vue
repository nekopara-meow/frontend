<template>
    <body style="margin: 0;">
        <div class="line"></div>
        <div class="head">
            <el-dropdown split-button type="primary">
                <span class="el-dropdown-link">
                    Meow Meow
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>保存</el-dropdown-item>
                        <el-dropdown-item>下载</el-dropdown-item>
                        <el-dropdown-item>重命名</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="line"></div>
        <div class="container">
            <div class="left">
                <div class="resize"></div>
                <div class="bar-btn"></div>
                <div class="content">
                    <div class="icons">
                        <div class="PlusSub">
                            <el-icon @click="AddPage"><Plus /></el-icon>
                            <div class="split"></div>
                            <el-icon @click="deletePage"><Delete /></el-icon>
                        </div>
                        <el-icon><MoreFilled /></el-icon>
                    </div>
                    <div class="line"></div>
                    <div class="page-menu">
                        <el-menu :default-active="mytoString(nowpage)">
                            <el-menu-item v-for="(item, Index) in pagesname"
                                :index="Index.toString()" @click="setPage(Index)">
                                <div class="menu-item">
                                    <div class="menu-item-left">
                                        <el-icon><Document /></el-icon>
                                        <span>{{ item }}</span>
                                    </div>
                                    <el-icon><MoreFilled /></el-icon>
                                </div>
                            </el-menu-item>
                        </el-menu>
                    </div>
                    
                    <div class="resize resize-c"></div>
                    <div class="line"></div>
                    <div class="item-menu">
                        <span>元素</span>
                        <el-menu :default-active="mytoString(now)">
                            <el-menu-item v-for="(item, Index) in pages[nowpage]" 
                                :index="Index.toString()" @click="setActive(Index)">
                                <div class="myitem">
                                    <span>{{ item.type }} {{ item.id }}</span>
                                    <!--
                                    <div>
                                        <el-icon @click="moveUp(Index)"><ArrowUp /></el-icon>
                                        <el-icon @click="moveDown(Index)"><ArrowDown /></el-icon>
                                    </div>
                                    -->
                                    <el-icon><MoreFilled /></el-icon>
                                </div>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="canvas">
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
                                v-model:active = item.active
                                
                                @activated = "setActive(index)"
                                @deactivated = "setDeActive(index)">
                                <div :class="item.style" :id="item.id">
                                </div>
                            </Vue3DraggableResizable>
                        </DraggableContainer>
                    </div>
                </div>
                <div class="right-tool">
                    <div class="toolbox">
                        <el-menu ref="elMenu" :default-active="mytoString(nowtool)">
                            <el-menu-item index="0" @click="setTool(0)">
                                <el-icon><Stopwatch /></el-icon>
                            </el-menu-item>
                            <el-menu-item index="1" @click="setTool(1)">
                                <el-icon><Picture /></el-icon>
                            </el-menu-item>
                            <el-menu-item index="2" @click="setTool(2)">
                                <el-icon><PieChart /></el-icon>
                            </el-menu-item>
                            <el-menu-item index="3" @click="setTool(3)">
                                <el-icon><Star /></el-icon>
                            </el-menu-item>
                            <el-menu-item index="4" @click="setTool(4)">
                                <el-icon><Setting /></el-icon>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="right-setting">
                </div>
            </div>
        </div>

        <div v-if="tool[0]" class="tool-1">
            <div class="tool-title">
                <span>组件</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="图形" name="1">
                    <div class="figure-button">
                        <div class="rect-button" @click="addRedRect"></div>
                        <div class="split"></div>
                        <div class="circle-button" @click="addCircle"></div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        
        <div v-if="tool[1]" class="tool-1">
            <div class="tool-title">
                <span>图片</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
        </div>

        <div v-if="tool[2]" class="tool-1">
            <div class="tool-title">
                <span>图表</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
        </div>

        <div v-if="tool[3]" class="tool-1">
            <div class="tool-title">
                <span>图标</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
        </div>

        <div v-if="tool[4]" class="tool-1">
            <div class="tool-title">
                <span>其它</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
        </div>

    </body>
</template>

<style lang="scss" scoped>

.myitem{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.redRect {
    /*background: red;*/
    width: 100%;
    height: 100%;

    border-color: black;
    border-style: solid;
    border-width: 2px;
    padding: 0;
}

.circle{
	width: 100%;
	height: 100%;

	border-color: black;
    border-style: solid;
	border-radius: 50%;
    border-width: 1.5px;
    padding: 0;
}

::v-deep(.el-collapse-item) {
    padding-left: 10px;
    padding-bottom: 0;
}

.tool-title{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 7px;

    background-color: rgb(241, 241, 241);
}

.tool-1{
    width: 200px;
    height: 400px;
    position: absolute;
    right: 340px;
    top: 160px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    opacity: 1 !important;
    background-color: white;

    .figure-button{
        display: flex;
        flex-direction: row;
        align-items: center;
        .rect-button{
            width: 30px;
            height: 30px;
            border-color: black;
            border-style: solid;
            border-width: 1.5px;
        }
        .circle-button{
            width: 30px;
            height: 30px;
            border-color: black;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 50%;
        }
        .split{
            width: 15px;
            height: 30px;
        }
    }
}

.my-table{
    width: 700px;
    height: 500px;
    background-color: white;
}

.container {
    display: flex;
    justify-content: flex-start;

    margin-top: 0 !important;
    margin-left: 10px !important;
    margin-right: 0 !important;
    padding: 0 !important;
    border: 0 !important;
}

.line{
    width: 100%;
    height: 1px;
    background-color: rgb(216, 216, 216);
}

.head{
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: large;
}

.left {
    position: relative;
    height: 600px;
}

.resize {
    width: 220px;
    resize: horizontal;
    overflow: scroll;
    height: inherit;
    opacity: 0;
}
.resize-c {
    height: 300px;
    resize: vertical;
    overflow: scroll;
    width: inherit;
    opacity: 0;
}
.bar-btn {
    height: 600px;
    width: 2px;
    background: #666;
    position: absolute;
    right: 0;
    top: 0;
}

.resize::-webkit-scrollbar {
    width: 200px;
    height: inherit;
}

.content {
    position: absolute;
    top: 0;
    right: 5px;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .icons{
        width: 90%;
        height: 40px;
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;

        .PlusSub{
            display: flex;
            flex-direction: row;
        }

        .split{
            height: 100%;
            width: 10px;
        }
    }

    ::v-deep(.el-menu-item){
        padding: 0px;
        padding-left: 5px;
        padding-right: 5px;
        height: 40px;
    }
    ::v-deep(.el-menu-item.is-active) {
        background-color: #8baeff !important;
        color: #fff;
        span {
            color: #fff !important;
        }
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
        }
    }

    .page-menu{
        position: relative;
        overflow: hidden;
    }
}

.right {
    width: 200px;
    flex: 1;
    background: #eee;
    height: 600px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .canvas{
        width: 800px;
        height: 100%;
        /* background-color: red; */

        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
    }

    .right-tool{
        width: 100px;
        height: 100%;
        padding-top: 40px;
        display: flex;
        justify-content: center;

        position: absolute;
        right: 250px;
        .toolbox{
            width: 60%;
            height: 300px;
            background-color: white;
            box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;

            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: space-around;
            padding: 0;
            font-size: 25px;

            ::v-deep(.el-menu) {
                width: 100%;
            }
            ::v-deep(.el-menu-item) {
                width: 100%;
                height: 50px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                padding-left: 25px;
            }
        }
    }

    .right-setting{
        position: absolute;
        right: 0;
        width: 15%;
        height: 100%;
        background: white;
    }
}

</style>

<script>
import { ElDropdown, ElMenu, ElCollapse} from 'element-plus'
import { Plus, MoreFilled, ArrowDown, Document } from '@element-plus/icons-vue'
import { Picture, PieChart, Stopwatch, Star, Setting } from '@element-plus/icons-vue'
import { CircleClose, Delete, ArrowUp } from '@element-plus/icons-vue'

import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default{
    components: { 
        ElDropdown, ElMenu, ElCollapse,
        ArrowDown, MoreFilled, Plus, Document,
        Picture, PieChart, Stopwatch, Star, Setting,
        CircleClose, Delete, ArrowUp,

        Vue3DraggableResizable, 
        DraggableContainer,
    },
    data() {
        return {
            tool: [
                false, false, false, false, false
            ],
            nowtool: null,

            pages: [
                [
                    { id: "el0", style: "redRect", type: "figure", active: false,
                        transform: { x: 100, y: 100, width: 100, height: 100 } },
                    { id: "el1", style: "redRect", type: "figure", active: false,
                        transform: { x: 200, y: 100, width: 100, height: 100 } },
                    { id: "el2", style: "redRect", type: "figure", active: false,
                        transform: { x: 300, y: 100, width: 100, height: 100 } },
                    { id: "el3", style: "redRect",  type: "figure", active: false,
                        transform: { x: 400, y: 100, width: 100, height: 100 } },
                ]
            ],
            pagesname: [
                "page-1"
            ],
            cnt: [4],
            now: null,
            nowpage: 0,
        }
        
    },
    methods: {
        mytoString(num){
            if(num == null)
                return null
            return num.toString()
        },
        TEST(){
            console.log('delete')
        },
        setTool(index){
            this.nowtool = index
            this.tool = [ false, false, false, false, false ]
            this.tool[index] = true
        },
        cancelTool(){
            this.tool[this.nowtool] = false
            this.nowtool = null
        },
        addRedRect(){
            //console.log('Add')
            let newItem = {"id": 'el' + this.cnt[this.nowpage], 
                style: "redRect", type: "figure", active: true,
                transform: { x: 0, y: 0, width: 100, height: 100 } }
            this.now = this.cnt[this.nowpage]
            this.cnt[this.nowpage] = this.cnt[this.nowpage] + 1
            this.pages[this.nowpage].push(newItem)
        },
        addCircle(){
            let newItem = {"id": 'el' + this.cnt[this.nowpage], 
                style: "circle", type: "figure", active: true,
                transform: { x: 0, y: 0, width: 100, height: 100 } }
            this.now = this.cnt[this.nowpage]
            this.cnt[this.nowpage] = this.cnt[this.nowpage] + 1
            this.pages[this.nowpage].push(newItem)
        },
        printList(){
            console.log(JSON.stringify(this.pages))
        },
        setActive(id){
            console.log(id)
            if(this.now != null)
                this.pages[this.nowpage][this.now].active = false
            this.now = id
            this.pages[this.nowpage][this.now].active = true
        },
        setDeActive(id){
            this.pages[this.nowpage][id].active = false
            if(this.now == id)
                this.now = null
        },
        Clear(){
            this.pages[this.nowpage] = []
        },
        Delete(){
            if(this.now == null){
                this.deletePage()
                return ;
            }
            this.pages[this.nowpage].splice(this.now, 1)
            this.now = null
        },
        AddPage(){
            this.pages.push([])
            this.pagesname.push("new-page")
            this.cnt.push(0)
            this.now = null
            this.nowpage = this.pages.length - 1
        },
        setPage(index){
            console.log(index)
            this.now = null
            this.nowpage = index
            console.log(this.nowpage)
        },
        deletePage(){
            if(this.pagesname.length == 1)
                return ;

            this.pages.splice(this.nowpage, 1)
            this.pagesname.splice(this.nowpage, 1)
            this.cnt.splice(this.nowpage, 1)
            this.now = null
            this.nowpage = 0
        },
        getdom(){
            if(this.now == null)
                return ;
            let sid = 'el' + this.now

            this.pages[this.nowpage][this.now].active = true
            document.getElementById(sid).setAttribute('style', 'background:grey')
        },
        moveUp(index){
            if(index == 0)
                return

            //arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            this.pages[this.nowpage][index] = 
                this.pages[this.nowpage].splice(index - 1, 1, this.pages[this.nowpage][index])[0]

            this.setDeActive(index - 1)
        },
        moveDown(index){

        },
    },
    mounted() {
        let that = this
        document.onkeydown = function(e) {
            console.log(e.which)
            if(e.which == 8 || e.which == 46)
                that.Delete()
        }
    },
}
</script>
