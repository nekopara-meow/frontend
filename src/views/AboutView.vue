<template>
    <a-form ref="musicFormRef" size="large" :model="musicForm" :style="{ width: '600px' }">
        <a-form-item label="音乐封面">
            <a-upload list-type="picture" draggable accept="image/*" :onSuccess="coverUpload"
                @before-upload="beforeUpload" :action="filesUploadUrl" :default-file-list="fileList" image-preview />
        </a-form-item>
        <a-form-item label="主题色">            <color-picker v-model:pureColor="pureColor" format="hex6" shape="circle" useType="both"
                v-model:gradientColor="gradientColor" />
            <br><br>
            <a-input v-model="pureColor" allow-clear placeholder="主题色HEX"></a-input>
        </a-form-item>
    </a-form>
</template>
<script scoped>
import { ColorPicker } from "vue3-colorpicker"
import "vue3-colorpicker/style.css"
import { ref } from "vue"
export default{
    components: { 
        ColorPicker
    },
    data(){
        return {
            pureColor: ref("#71afe5"),
            gradientColor: ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)")
        }
    }
}
</script>
 