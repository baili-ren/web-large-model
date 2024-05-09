<template>
    <div class="home">
        <div class="welcome-label1">欢迎向我提问</div>
        <!-- <div class="welcome-label2">试试这样问我：</div> -->
        <div class="modules">
            <div
                class="card"
                :class="{ 'card-selected': modelType === ModelType.senmantics }"
                @click="handleChooseModule(ModelType.senmantics)"
            >
                <img class="icon" src="@/assets/senmantics.png" alt="" />
                <div class="title">图像语义识别</div>
                <div class="des">上传图片，并对画面的内容进行描述</div>
            </div>
            <div
                class="card"
                :class="{ 'card-selected': modelType === ModelType.scene }"
                @click="handleChooseModule(ModelType.scene)"
            >
                <img class="icon" src="@/assets/scene.png" alt="" />
                <div class="title">图像场景识别</div>
                <div class="des">上传图片，并对图像的场景进行分类</div>
            </div>
            <div
                class="card"
                :class="{ 'card-selected': modelType === ModelType.structure }"
                @click="handleChooseModule(ModelType.structure)"
            >
                <img class="icon" src="@/assets/structure.png" alt="" />
                <div class="title">图像结构化分析</div>
                <div class="des">对图像进行万物分割，解析图像深层内容</div>
            </div>
            <div
                class="card"
                :class="{ 'card-selected': modelType === ModelType.video }"
                @click="handleChooseModule(ModelType.video)"
            >
                <img class="icon" src="@/assets/video.png" alt="" />
                <div class="title">视频检索</div>
                <div class="des">基于视频内容进行检索和问答对话</div>
            </div>
        </div>
        <div class="operation">
            <meg-button
                class="start-btn"
                type="primary"
                @click="startConversation"
                >开始对话</meg-button
            >
        </div>
    </div>
</template>
<script>
import { ModelType } from "@/constants/enums";

export default {
    data() {
        return {
            ModelType,
            modelType: ModelType.senmantics,
        };
    },
    methods: {
        handleChooseModule(v) {
            this.modelType = v;
        },
        startConversation() {
            this.$router.push({
                path: "/chat",
                query: {
                    modelType: this.modelType,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
