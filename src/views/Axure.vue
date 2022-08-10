<template>
    <body style="margin: 0;">
        <div class="line"></div>
        <div class="head">
            <el-dropdown split-button type="primary">
                <div @dblclick="startChangeName">
                    <input v-if="changingName"
                        :value = AxureName
                        @change="changeName"
                        style="border:none; 
                            background-color: transparent;
                            color: white;">
                    <span v-else class="el-dropdown-link">
                        {{ AxureName }}
                    </span>
                </div>
                    
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="upload">
                            保存
                        </el-dropdown-item>
                        <el-dropdown-item @click="bePic">导出</el-dropdown-item>
                        <el-dropdown-item>重命名</el-dropdown-item>
                        <el-dropdown-item @click="download">加载</el-dropdown-item>
                        <el-dropdown-item @click="preview">预览</el-dropdown-item>
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
                    <div class="my-table" ref="imgDom">
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
                                @deactivated = "setDeActive(index)"
                                @resizing = "resizingHandle">
                                <div v-if = "isLable(item.type)" :style="item.style" :id="item.id">
                                    <div v-if="changingLable">
                                        <input :value="item.content"
                                            @change="changeLable($event, index)"
                                            type="text" :style="item.style">
                                    </div>
                                    <div v-else @dblclick="editLable">
                                        {{ item.content }}
                                    </div>
                                </div>
                                <div v-else-if="isBtn(item.type)" :style="item.style" :id="item.id">
                                    <el-button v-if="haveColor(item.btnColor)" :type="item.btnType"
                                        :round = "isBtnRound(item.shape)"
                                        :circle = "isBtnCircle(item.shape)"
                                        :plain = "item.plain"
                                        :text = "item.text"
                                        :color = "item.btnColor"
                                        @dblclick="editLable" padding = 0>
                                        <input v-if="changingLable" :value="item.content"
                                            @change="changeLable($event, index)"
                                            style="border: none; 
                                                background-color: transparent;
                                                font-size: 15px;
                                                width: 100%">
                                        <span v-else>
                                            {{ item.content }}
                                        </span>
                                    </el-button>

                                    <el-button v-else :type="item.btnType"
                                        :round = "isBtnRound(item.shape)"
                                        :circle = "isBtnCircle(item.shape)"
                                        :plain = "item.plain"
                                        :text = "item.text"
                                        @dblclick="editLable" padding = 0>
                                        <input v-if="changingLable" :value="item.content"
                                            @change="changeLable($event, index)"
                                            style="border: none; 
                                                background-color: transparent;
                                                font-size: 15px;
                                                width: 100%">
                                        <span v-else>
                                            {{ item.content }}
                                        </span>
                                    </el-button>
                                </div>
                                <div v-else-if="isInput(item.type)" :style="item.style" :id="item.id">
                                    <el-input :placeholder="item.content">
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
                    <div v-if="lastnow != null">
                        <div class="right-setting-head">
                            <span>
                                {{pages[nowpage][lastnow].type}}
                                {{pages[nowpage][lastnow].id}}
                            </span>
                            <div class="right-setting-head-icon">
                                <el-icon><View /></el-icon>
                                <el-icon><Unlock /></el-icon>
                            </div>
                        </div>
                        <div class="line"></div>
                        
                        <div style="width: 100%; height: 10px"></div>
                        <span class="right-setting-title">基础</span>
                        <div class="right-setting-position">
                            <span style="font-size: 12px">X</span>
                            <div style="width: 5%; height: 20px;"></div>
                            <el-input-number
                                v-model = pages[nowpage][lastnow].transform.x
                                size = "small"
                                step = "10"
                                style = "width: 100px"
                                controls-position = "right"
                                @change = "changeX">
                            </el-input-number> 
                            <div style="width: 10%; height: 20px"></div>
                            <span style="font-size: 12px">Y</span>
                            <div style="width: 5%; height: 20px"></div>
                            <el-input-number
                                v-model = pages[nowpage][lastnow].transform.y
                                size="small"
                                step = "10"
                                style="width: 100px"
                                controls-position="right"
                                @change = "changeX">
                            </el-input-number>               
                            
                        </div>
                        <div class="right-setting-position">
                            <span style="font-size: 12px">w</span>
                            <div style="width: 5%; height: 20px"></div>
                            <el-input-number 
                                v-model = pages[nowpage][lastnow].transform.width
                                size="small"
                                step = "10"
                                style="width: 100px"
                                controls-position="right"
                                @change = "changeX">
                            </el-input-number> 
                            <div style="width: 10%; height: 20px"></div>
                            <span style="font-size: 12px">H</span>
                            <div style="width: 5%; height: 20px"></div>
                            <el-input-number
                                v-model = pages[nowpage][lastnow].transform.height
                                size="small"
                                step = "10"
                                style="width: 100px"
                                controls-position="right"
                                @change = "changeX">
                            </el-input-number>               
                            
                        </div>
                        <div class="line"></div>
                        <el-collapse v-model="SettingActiveName">
                            <el-collapse-item title="外观" name="1">
                                <!--
                                <div style="width: 100%; height: 10px"></div>
                                <span class="right-setting-title">外观</span>
                                -->
                                <div v-if="isRectCircle(lastnow)" class="right-setting-border">
                                    <span>边框</span>
                                    <span style="width: 35px"></span>
                                    <el-slider
                                        v-model = "pages[nowpage][lastnow].border"
                                        :min = 0 :max = 10
                                        @change = "changeBorder"
                                        style = "width: 70%; height: 10px" size = "small"
                                    />
                                </div>

                                <div class="right-setting-border">
                                    <span>透明度</span>
                                    <span style="width: 20px"></span>
                                    <el-slider
                                        @change="changeOpacity"
                                        :step = 0.01
                                        v-model = "pages[nowpage][lastnow].opacity"
                                        :min = 0 :max = 1
                                        style = "width: 70%; height: 10px" size = "small"
                                    />
                                </div>

                                <div v-if="isRectCircle(lastnow)" class="right-setting-border">
                                    <!--
                                    <color-picker
                                        v-model:pureColor = "pureColor"
                                        v-model:gradientColor = "gradientColor"
                                        shape="circle"
                                        useType = "both"
                                        :zIndex = 20
                                    />-->
                                    <span>边框颜色</span>
                                    <span style="width: 20px"></span>
                                    <el-color-picker
                                        @change="changeBorderColor"
                                        v-model="pages[nowpage][lastnow].border_color">
                                    </el-color-picker>
                                    
                                    <span style="width: 20px"></span>
                                    
                                    <span>填充颜色</span>
                                    <span style="width: 20px"></span>
                                    <el-color-picker show-alpha
                                        @change="changeFillColor"
                                        v-model="pages[nowpage][lastnow].fill_color">
                                    </el-color-picker>
                                </div>

                                <!-- v-if="isLable(pages[nowpage][lastnow].type)" -->
                                <div v-if="isLable(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>字体颜色</span>
                                    <span style="width: 20px"></span>
                                    <el-color-picker
                                        @change="changeFontColor"
                                        v-model="pages[nowpage][lastnow].border_color">
                                    </el-color-picker>
                                    
                                    <span style="width: 20px"></span>
                                    
                                    <span>背景颜色</span>
                                    <span style="width: 20px"></span>
                                    <el-color-picker show-alpha
                                        @change="changeBackGroundColor"
                                        v-model="pages[nowpage][lastnow].fill_color">
                                    </el-color-picker>
                                </div>

                                <div v-if="isLable(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>字体大小</span>
                                    <span style="width: 8px"></span>
                                    <el-input-number
                                        @change="changeFontSize"
                                        style = "width: 100px;"
                                        size = "small"
                                        controls-position = "right"
                                        v-model = "pages[nowpage][lastnow].font_size">
                                    </el-input-number>
                                </div>

                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>按钮样式</span>
                                </div>

                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <div style="width: 46px; height: 23px;">
                                        <el-button style="font-size: 5px" @click="setBtnType('', false)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="primary"
                                            style="font-size: 5px"
                                            @click="setBtnType('primary', false)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="success"
                                            style="font-size: 5px"
                                            @click="setBtnType('success', false)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="warning"
                                            style="font-size: 5px"
                                            @click="setBtnType('warning', false)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="danger"
                                            style="font-size: 5px"
                                            @click="setBtnType('danger', false)">
                                            btn
                                        </el-button>
                                    </div>
                                </div>

                                <div style="width: 100px; height: 5px"></div>
                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <div style="width: 46px; height: 23px;">
                                        <el-button
                                            style="font-size: 5px"
                                            @click="setBtnType('', true)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="primary" plain
                                            style="font-size: 5px"
                                            @click="setBtnType('primary', true)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="success" plain
                                            style="font-size: 5px"
                                            @click="setBtnType('success', true)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="warning" plain
                                            style="font-size: 5px"
                                            @click="setBtnType('warning', true)">
                                            btn
                                        </el-button>
                                    </div>
                                    <div style="width: 10px; height: 20px"></div>
                                    <div style="width: 46px; height: 23px;">
                                        <el-button type="danger" plain
                                            style="font-size: 5px"
                                            @click="setBtnType('danger', true)">
                                            btn
                                        </el-button>
                                    </div>
                                </div>

                                <div style="width: 100px; height: 10px"></div>
                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>隐藏边框与背景色</span>
                                    <div style="width: 10px; height: 10px"></div>
                                    <el-checkbox
                                        @click = "changeText"
                                        v-model = "pages[nowpage][lastnow].text">
                                    </el-checkbox>
                                </div>

                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>形状</span>
                                    <div style="width: 30px; height: 10px"></div>
                                    <el-radio-group
                                        v-model = "pages[nowpage][lastnow].shape"
                                        @change = "changeShape"
                                    >
                                        <el-radio :label = "0" size = "small">
                                            方形
                                        </el-radio>
                                        <el-radio :label = "1" size = "small">
                                            圆角
                                        </el-radio>
                                        <el-radio :label = "2" size = "small">
                                            圆形
                                        </el-radio>
                                    </el-radio-group>
                                </div>

                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>自定义按钮颜色</span>
                                    <div style="width: 10px; height: 10px"></div>
                                    <el-color-picker
                                        @change = "changeBtnColor"
                                        v-model = "pages[nowpage][lastnow].btnColor">
                                    </el-color-picker>
                                </div>

                                <div v-if="isBtn(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>文本</span>
                                    <span style="width: 15px;"></span>
                                    <el-input
                                        v-model="pages[nowpage][lastnow].content"
                                        style="width: 70%; height: 25px; font-size: 13px"
                                    >
                                    </el-input>
                                </div>

                                <div v-if="isInput(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>前置元素</span>
                                    <span style="width: 10px"></span>
                                    <el-checkbox></el-checkbox>
                                    <span style="width: 20px"></span>
                                    <el-input style="width: 50%; height: 26px"></el-input>
                                </div>

                                <div v-if="isInput(pages[nowpage][lastnow].type)"
                                    class="right-setting-border">
                                    <span>后置元素</span>
                                    <span style="width: 10px"></span>
                                    <el-checkbox></el-checkbox>
                                    <span style="width: 20px"></span>
                                    <el-input style="width: 50%; height: 26px"></el-input>
                                </div>

                            </el-collapse-item>

                            <el-collapse-item title="事件" name="2">
                                <span>事件 气死我了</span>
                            </el-collapse-item>
                        </el-collapse>
                        
                    </div>
                </div>
            </div>
        </div>

        <div v-if="tool[0]" class="tool-1">
            <div class="tool-title">
                <span>组件</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
            <el-collapse v-model="activeNames" >
                <el-collapse-item title="图形" name="1">
                    <div class="figure-button">
                        <div class="rect-button" @click="addRedRect"></div>
                        <div class="split"></div>
                        <div class="circle-button" @click="addCircle"></div>
                        <div class="split"></div>
                        <div class="mykangle" @click="addKangle"></div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="常用" name="2">
                    <div class="figure-button">
                        <div class="label-button" @click="addLable">T</div>
                        <div class="split"></div>
                        <div class="button-button-white" @click="addBtnWhite">按钮</div>
                        <div class="split"></div>
                        <div class="button-button-grey" @click="addBtnGrey">按钮</div>
                    </div>
                    <div class="figure-button">
                        <div class="split-up"></div>
                    </div>
                    <div class="figure-button">
                        <div class="input-button" @click="addInput">input</div>
                        <div class="split"></div>
                        <div class="search-button">
                            <span>search</span>
                            <el-icon><Search /></el-icon>
                        </div>
                    </div>
                    <div class="figure-button">
                        <div class="split-up"></div>
                    </div>
                    <div class="figure-button">
                        <el-radio disabled margin="0"></el-radio>
                        <span>单选框</span>
                        
                    </div>
                </el-collapse-item>

                <el-collapse-item title="图标" name="3">
                    <!--
                    <div v-for = "(name,index) in icons"
                        style="padding: 10px; 
                            display: flex; 
                            flex-direction: row;">
                        <component 
                            :is="icons[index]"
                            style="width: 20px; height: 20px; color: grey">
                        </component>
                    </div>-->
                    <el-scrollbar height="150">
                        <div v-for = "index0 in 47"
                            style="display: flex; 
                            flex-direction: row;"
                        >
                            <div v-for = "index in 6"
                                style="width: 30px; height: 30px; padding: 5;">
                                <component
                                    :is="icons[(index0 - 1) * 6 + index - 1]"
                                    style="width: 20px; height: 20px;
                                        color: grey;">
                                </component>
                            </div>
                        </div>
                        
                    </el-scrollbar>
                    
                </el-collapse-item>
            </el-collapse>
        </div>
        
        <div v-if="tool[1]" class="tool-1">
            <div class="tool-title">
                <span>图片</span>
                <el-icon @click="cancelTool"><CircleClose /></el-icon>
            </div>
            <div class="line"></div>
            <div
                style =
                    "width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;"
            >
                <div style="width: 80%;">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        disabled = true>
                        <el-icon><Upload /></el-icon>
                        <div class="el-upload__text">将文件拖到此处</div>
                        <div class="el-upload__text">或<em>点击上传</em></div>
                    </el-upload>
                </div>
            </div>
            
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
                <span>模板</span>
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
        
        <el-dialog v-model="dialogVisible" title="导出预览">
            <img width="500" :src="imgUrl" />
        </el-dialog>
    </body>
</template>

<style lang="scss" scoped>

::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
}
// 滚动条轨道
::-webkit-scrollbar-track {
    width: 5px;
    border-radius: 40px;
    background-color: white;
}
// 滚动条滑块
::-webkit-scrollbar-thumb {
    border: 0;
    border-radius: 10px;
    background-color: rgb(205, 205, 205);
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
.el-input-number .el-input__wrapper {
    width: 50px;
    height: 20px;
}

.el-button{
    width: 100%;
    height: 100%;
}

.el-input{
    width: 100%;
    height: 100%;
    .icons{
        height: 90%;
    }
}

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
    right: 420px;
    top: 160px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    opacity: 1 !important;
    background-color: white;
    overflow: auto;
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
        .label-button{
            width: 30px;
            height: 30px;
            border-color: black;
            border-style: solid;
            border-width: 1.5px;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 20px;
        }
        .circle-button{
            width: 30px;
            height: 30px;
            border-color: black;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 50%;
        }
        .button-button-white{
            width: 40px;
            height: 28px;
            border-color: black;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 5px;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .button-button-grey{
            width: 40px;
            height: 28px;
            border-color: transparent;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 5px;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            background-color: rgb(158, 158, 158);
            color: white;
        }

        .input-button{
            width: 65px;
            height: 25px;
            border-color: grey;
            color: grey;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 5px;
            opacity: 0.65;

            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 3px;
        }

        .search-button{
            width: 80px;
            height: 25px;
            border-color: grey;
            color: grey;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 5px;
            opacity: 0.65;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 3px;
            padding-right: 3px;
        }

        .radio-button{
            width: 60px;
            height: 30px;
            border-color: transparent;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
        }

        .split{
            width: 15px;
            height: 30px;
        }
        .split-up{
            width: 150px;
            height: 15px;
        }
    }
}

.my-table{
    width: 700px;
    height: 450px;
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
            .input{
                height: 50%;
                background-color: transparent;
                border: none;
            }
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
        right: 330px;
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
        width: 300px;
        height: 100%;
        background: white;
        
        display: flex;
        flex-direction: column;

        overflow: auto;

        :deep(.el-collapse-item__header){
            font-size: 15px;
            font-weight: 200;
            color: grey;
        }

        .right-setting-title {
            font-size: 15px;
            font-weight: 200;
            color: grey;
            padding-left: 10px;
            padding-top: 20px;
        }

        .right-setting-border{
            width: 100%;
            padding-top: 7px;
            padding-left: 10px;
            font-size: 13px;
            font-weight: 200;
            
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .right-setting-head {
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 8px;
            padding-bottom: 7px;
            font-size: 16px;
            font-weight: 200;
            color: grey;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            
            .right-setting-head-icon {
                width: 20%;
                height: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                font-size: 15px;
                .el-input-number{
                    width: 20px;
                }
            }
        }
        .right-setting-position{
            width: 100%;
            padding: 10px;
            display: flex;
            flex-direction: row;
            
            align-items: center;
        }
    }
}

.mykangle{ /*三角形*/
	width: 0;
	height: 0;
	border-bottom: solid 30px black;
    border-left: solid 15px transparent;
    border-right: solid 15px transparent;
    position: relative;
}
.mykangle::before{ /*小三角形*/
	content: "";
	display: block;
	width: 0;
	height: 0;
	border-bottom: solid 29px white;
    border-left: solid 14px transparent;
    border-right: solid 13px transparent;
    position: absolute;
    top: 0px;
    left: -13.5px;
}

.input{
    border: none
}

</style>

<script>
import { ElDropdown, ElMenu, ElCollapse, 
    ElButton, ElRadio, ElMessage, ElScrollbar} from 'element-plus'
import { Plus, MoreFilled, ArrowDown, Document } from '@element-plus/icons-vue'
import { Picture, PieChart, Stopwatch, Star, Setting } from '@element-plus/icons-vue'
import { CircleClose, Delete, ArrowUp, Search } from '@element-plus/icons-vue'
import { View, Unlock } from '@element-plus/icons-vue'
import * as ElIcons from '@element-plus/icons-vue'

import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import html2canvas from "html2canvas"
import {ImagePreview} from 'vant'

import Axios from "axios"

import OSS from "ali-oss"

import { save_axure } from "@/utils/api"

import { ColorPicker } from "vue3-colorpicker"
import "vue3-colorpicker/style.css"

import { ref } from "vue"
import { ColorInputWithoutInstance } from "tinycolor2"

export default{
    components: { 
        ElDropdown, ElMenu, ElCollapse, 
        ElButton, ElRadio, ElMessage, ElScrollbar, 
        
        ArrowDown, MoreFilled, Plus, Document,
        Picture, PieChart, Stopwatch, Star, Setting,
        CircleClose, Delete, ArrowUp, Search,
        View, Unlock,

        Vue3DraggableResizable, 
        DraggableContainer,

        html2canvas, ImagePreview,

        ColorPicker,

        ...ElIcons, 
    },
    data() {
        return {
            URLpage: "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/exampledir/exampleobject.json",
            URLpageName: "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/exampledir/exampleobject_name.json",
            axure_id: "",

            textNumx: 0,
            pureColor: "#d0e0f7",

            SettingActiveName: "1",

            AxureName: "Meow Meow",
            changingName: false,

            icons: [],

            tool: [
                false, false, false, false, false
            ],
            nowtool: null,

            pages: [
                [
                    {   
                        id: "el0", type: "figure-rect", active: false,
                        transform: { x: 100, y: 100, width: 100, height: 100 }, 
                        style: { "width": "100%", "height": "100%",
                            "border-color": "black", "border-style": "solid",
                            "border-width": "2px", "padding": "0",
                            "opacity": "1", "background-color": "transparent"
                        },
                        border: 2, opacity: 1,
                        border_color: "#000000", fill_color: 'rgba(0, 0, 0, 0)'
                    },

                    
                    /*{   
                        id: "el0", type: "btn", active: false,
                        transform: { x: 100, y: 100, width: 62, height: 32 },
                        style: { "width": "100%", "height": "100%"},
                        btnType: "primary", content: "按钮"
                    }*/

                    /*{   
                        id: "el0", type: "input", active: false,
                        transform: { x: 100, y: 100, width: 230, height: 40 },
                        style: { "width": "100%", "height": "100%"},
                        content: "Please Input",
                        pretend: "", append: "",
                        prefix_icon: "Search", suffix_icon:"Calendar"
                    }*/
                ]
            ],
            pagesname: [
                "page-1"
            ],
            now: null,
            lastnow: null,
            nowpage: 0,
            
            dialogVisible: false,
            imgUrl: null,

            changingLable: false,
            changingPageName: false,

            kangle: {
	            "width": "0",
	            "height": "0",
	            "border-bottom": "solid 100px red",
                "border-left": "solid 50px transparent",
                "border-right": "solid 50px transparent",
                "position": "relative",
                "opacity": "1",
            },

            redRect: {
                /*background: red;*/
                "width": "100%",
	            "height": "100%",

                "border-color": "black",
                "border-style": "solid",
                "border-width": "2px",
                "padding": "0",
                "opacity": "1",
                "background-color": "transparent"
            },

            circle: {
                "width": "100%",
	            "height": "100%",

                "border-color": "black",
                "border-style": "solid",
                "border-radius": "50%",
                "border-width": "2px",
                "padding": "0",
                "opacity": "1",
                "background-color": "transparent"
            },

            Lable: {
                "width": "100%",
                "height": "100%",
                "color": "black",
                "border": "none",
                "opacity": "1",
                "background-color": "transparent",
                "font-size": "18px",
            },
            
        }
        
    },
    methods: {
        haveColor(color){
            if(color == "" || color.length < 0)
                return false
            return true
        },
        changeBtnColor(value){
            console.log(value)
            this.setActive(this.lastnow)
            let index = this.lastnow
            this.pages[this.nowpage][index].btnColor = value.toString()
        },
        changeShape(value){
            this.setActive(this.lastnow)
        },
        isBtnRound(shape){
            return shape == 1
        },
        isBtnCircle(shape){
            return shape == 2
        },
        changeText(value){
            this.setActive(this.lastnow)
        },
        setBtnType(BtnType, Plain){
            //console.log('setBtnType', BtnType, Plain)
            this.setActive(this.lastnow)
            let index = this.lastnow
            this.pages[this.nowpage][index].btnType = BtnType
            this.pages[this.nowpage][index].plain = Plain
            this.pages[this.nowpage][index].btnColor = ""
            //console.log(this.pages[this.nowpage][index].plain)
        },
        changeFontSize(value){
            this.setActive(this.lastnow)
            let index = this.lastnow
            this.pages[this.nowpage][index].style['font-size'] = value + "px"
        },
        changeFontColor(value){
            this.setActive(this.lastnow)
            //console.log('changeFontColor', value)

            let index = this.lastnow
            this.pages[this.nowpage][index].style['color'] = value
        },
        changeBackGroundColor(value){
            this.setActive(this.lastnow)
            //console.log('changeBackGroundColor', value)

            let index = this.lastnow
            this.pages[this.nowpage][index].style['background-color'] = value
        },
        changeBorderColor(value){
            this.setActive(this.lastnow)
            //console.log('changeBorderColor', value)

            let index = this.lastnow
            this.pages[this.nowpage][index].style['border-color'] = value
        },
        changeFillColor(value){
            this.setActive(this.lastnow)
            //console.log('changeFillColor', value)

            let index = this.lastnow
            this.pages[this.nowpage][index].style['background-color'] = value
        },
        isRectCircle(index){
            //console.log('isRectCircle', this.lastnow, index)
            let strtype = this.pages[this.nowpage][index].type
            //console.log(this.pages[this.nowpage][index].style['border-width'])
            return strtype === "figure-rect" || strtype === "figure-circle"
        },
        changeBorder(value){
            this.setActive(this.lastnow)
            this.pages[this.nowpage][this.now].style["border-width"] = value + "px"
        },
        //"opacity": "1"
        changeOpacity(value){
            this.setActive(this.lastnow)
            this.pages[this.nowpage][this.now].style["opacity"] = value + ''
        },
        changeX(value){
            console.log('changeX', value, this.lastnow)
            this.setActive(this.lastnow)
        },
        // pretend: "", append: ""
        preview(){

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
        ChangingThisPage(index){
            return this.changingPageName && (index == this.nowpage)
        },
        startChangePageName(){
            console.log('startChangePageName')
            this.changingPageName = true
        },
        startChangeName(){
            this.changingName = true
        },
        changePageName(e, index){
            let that = this
            that.changingPageName = false
            that.pagesname[index] = e.target.value
        },
        changeName(e){
            this.changingName = false
            this.AxureName = e.target.value
        },
        changeLable(e, index){
            let that = this
            console.log(e.target.value)
            console.log(index)
            that.changingLable = false
            that.pages[this.nowpage][index].content = e.target.value
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
        bePic(){
            html2canvas(this.$refs.imgDom).then(canvas => {
                // 转成图片，生成图片地址
                this.imgUrl = canvas.toDataURL("image/png");
                //赋值给vant组件直接显示
                //ImagePreview({images: [imgUrl], closeable: true});
                //window.open(imgUrl.toString(), '_self')

                /*var iframe = "<iframe width='100%' height='100%' src='" + imgUrl + "'></iframe>"
                var x = window.open()
                x.document.open()
                x.document.write(iframe)
                x.document.close()*/

                this.dialogVisible = true
            });
        },
        mytoString(num){
            if(num == null)
                return null
            return num.toString()
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
            let Cnt = this.pages[this.nowpage].length
            let newItem = {"id": 'el' + Cnt, 
                type: "figure-rect", active: true,
                transform: { x: 0, y: 0, width: 100, height: 100 },
                style: this.redRect,
                border: 2, opacity: 1,
                border_color: "#000000", fill_color: 'rgba(0, 0, 0, 0)'
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        addCircle(){
            let Cnt = this.pages[this.nowpage].length
            let newItem = {"id": 'el' + Cnt, 
                type: "figure-circle", active: true,
                transform: { x: 0, y: 0, width: 100, height: 100 },
                style: this.circle,
                border: 2, opacity: 1,
                border_color: "#000000", fill_color: 'rgba(0, 0, 0, 0)'
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        addKangle(){
            let Cnt = this.pages[this.nowpage].length
            let newItem = {"id": 'el' + Cnt, 
                type: "figure-kangle", active: true,
                transform: { x: 0, y: 0, width: 100, height: 100 },
                style: this.kangle, opacity: 1
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        addLable(){
            let Cnt = this.pages[this.nowpage].length
            let newItem = {"id": 'el' + Cnt, 
                type: "lable", active: true,
                transform: { x: 0, y: 0, width: 130, height: 40},
                style: this.Lable, content: "这是一段文字", opacity: 1,
                border_color: "#000000", fill_color: 'rgba(0, 0, 0, 0)',
                font_size: 18,
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        addBtnWhite(){
            let Cnt = this.pages[this.nowpage].length
            let newItem = { "id": 'el' + Cnt, 
                type: "btn", active: true,
                transform: { x: 0, y: 0, width: 62, height: 32 },
                style: { "width": "100%", "height": "100%"},
                btnType: "", content: "按钮", opacity: 1,
                shape: ref(0), plain: false, text: ref(false),
                btnColor: "",
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        addBtnGrey(){
            let Cnt = this.pages[this.nowpage].length
            let newItem = { "id": 'el' + Cnt, 
                type: "btn", active: true,
                transform: { x: 0, y: 0, width: 62, height: 32 },
                style: { "width": "100%", "height": "100%"},
                btnType: "primary", content: "按钮", opacity: 1,
                shape: ref(0), plain: false, text: ref(false),
                btnColor: "",
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        addInput(){
            let Cnt = this.pages[this.nowpage].length
            let newItem = { "id": 'el' + Cnt, 
                type: "input", active: true,
                transform: { x: 0, y: 0, width: 230, height: 40 },
                style: { "width": "100%", "height": "100%"},
                content: "Please Input",
                pretend: "", append: "", opacity: 1
            }
            this.now = Cnt
            this.lastnow = Cnt
            this.pages[this.nowpage].push(newItem)
        },
        printList(){
            console.log(JSON.stringify(this.pages))
        },
        setActive(id){
            if(this.now != null)
                this.pages[this.nowpage][this.now].active = false
            this.now = id
            this.lastnow = id
            this.pages[this.nowpage][this.now].active = true
        },
        setDeActive(id){
            this.changingLable = false
            this.pages[this.nowpage][id].active = false
            if(this.now == id)
                this.now = null
        },
        Clear(){
            this.pages[this.nowpage] = []
        },
        Delete(){
            if(this.changingLable)
                return ;
            if(this.now == null){
                this.deletePage()
                return ;
            }
            this.pages[this.nowpage].splice(this.now, 1)
            this.now = null
            this.lastnow = null
        },
        AddPage(){
            this.pages.push([])
            this.pagesname.push("new-page")
            this.now = null
            this.lastnow = null
            this.nowpage = this.pages.length - 1
            //this.changingPageName = false
        },
        setPage(index){
            this.now = null
            this.lastnow = null
            this.nowpage = index
            //this.changingPageName = false
        },
        deletePage(){
            if(this.pagesname.length == 1)
                return ;

            this.pages.splice(this.nowpage, 1)
            this.pagesname.splice(this.nowpage, 1)
            this.now = null
            this.lastnow = null
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
        resizingHandle(){
            if(this.now == null)
                return ;
            let ob = this.pages[this.nowpage][this.now]
            if(ob.type === "figure-kangle"){
                let w = ob.transform.width
                let h = ob.transform.height
                
                this.pages[this.nowpage][this.now].style["border-bottom"] = "solid " + h + "px red"
                this.pages[this.nowpage][this.now].style["border-left"] = "solid " + (w/2) + "px transparent"
                this.pages[this.nowpage][this.now].style["border-right"] = "solid " + (w/2) + "px transparent"
            }
        },
        editLable(){
            console.log('editLable')
            this.changingLable = true
            console.log(this.changingLable)
        },
        getFileNameUUID(){
            function rx() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            }
            return `${+new Date()}_${rx()}${rx()}`
        },
        upload() {
            let text = JSON.stringify(this.pages)
            const data = new Blob([text])
            var client = new OSS({
                endpoint: "oss-cn-hangzhou.aliyuncs.com", //填写Bucket所在地域
                accessKeyId: "LTAI5tNTp64pvj7ZyM9GBBrB",
                accessKeySecret: "uraarRMA75smURHejuKbVw6IhMgxWM",
                bucket: "miaotu-headers", // 填写Bucket名称。
            })
            //var fileName = "exampledir/exampleobject.json"
            var fileName = "Axure/" + this.getFileNameUUID() + ".json"
            client.put(fileName, data)
            //url="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName;
        
            let text2 = JSON.stringify(this.pagesname)
            const data2 = new Blob([text2])
            var client2 = new OSS({
                endpoint: "oss-cn-hangzhou.aliyuncs.com", //填写Bucket所在地域
                accessKeyId: "LTAI5tNTp64pvj7ZyM9GBBrB",
                accessKeySecret: "uraarRMA75smURHejuKbVw6IhMgxWM",
                bucket: "miaotu-headers", // 填写Bucket名称。
            })
            var fileName2 = "Axure/" + this.getFileNameUUID() + ".json"
            client2.put(fileName2, data2)

            console.log(fileName)
            console.log(fileName2)

            console.log(this.axure_id)
            /*console.log('save_axure',{
                axure_id: this.axure_id,
                axure_url: "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName,
                name_url: "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName2
            })*/

            save_axure({
                axure_id: this.axure_id,
                axure_url: "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName,
                name_url: "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName2
            }).then((response) => {
                let ret = response.data.status_code
                if(ret == -1)
                    ElMessage.error("请求方式错误")
                else
                    ElMessage({
                        message: "保存成功",
                        type: "success",
                    })
            })
        },
        download(){

            let that = this
            let url = that.URLpage
            Axios({
                method: 'get',
                url, responseType: 'blob',
                transformResponse: [function (data) {
                    let reader = new FileReader()
                    reader.readAsText(data, 'UTF-8')
                    reader.onload = function () {
                        //此处便是返回值
                        let text = reader.result
                        console.log(text)
                        that.pages = JSON.parse(text)
                    }
                    return data;
                }]
            })
            .then(res => {
                console.log('res')
            })

            url = that.URLpageName
            Axios({
                method: 'get',
                url, responseType: 'blob',
                transformResponse: [function (data) {
                    let reader = new FileReader()
                    reader.readAsText(data, 'UTF-8')
                    reader.onload = function () {
                        //此处便是返回值
                        console.log('reader')
                        console.log(reader.result)
                        let text = reader.result
                        that.pagesname = JSON.parse(text)
                        console.log(that.pagesname)
                    }
                    return data;
                }]
            })
            .then(res => {
                console.log('res')
                console.log(res.data)
            })
        },
    },
    mounted() {
        let that = this
        document.onkeydown = function(e) {
            if(that.changingLable || that.changingName || that.changingPageName)
                return
            if(e.which == 8 || e.which == 46)
                that.Delete()
        }

        console.log('params')
        console.log(this.$route.params)
        that.URLpage = this.$route.params.URLpage
        that.URLpageName = this.$route.params.URLpageName
        that.axure_id = this.$route.params.axure_id

        if(that.URLpage == null || that.URLpage.length < 1
            || that.URLpage == '') {
            let fileName = "Axure/" + this.getFileNameUUID() + ".json"
            that.URLpage = "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName
            let fileName2 = "Axure/" + this.getFileNameUUID() + ".json"
            that.URLpageName = "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName2
        }

        console.log(that.URLpage)
        console.log(that.URLpageName)
        console.log(that.axure_id)
    },
    created() {
        let that = this
        for (const name in ElIcons)
            that.icons.push(name)
        console.log('icons', that.icons.length)     
    }
}
</script>
