<template>
    <div class="home">
        <div class="welcome-label1">欢迎向我提问</div>
        <div class="welcome-label2">试试这样问我：</div>
        <div class="modules">
            <div
                class="card"
                :class="{ 'card-selected': modelType === ModelType.senmantics }"
                @click="handleChooseModule(ModelType.senmantics)"
            >
                <img class="icon" src="@/assets/senmantics.png" alt="" />
                <div class="title">图像语义识别</div>
                <div class="des">帮我描述一下画面内容</div>
            </div>
            <div
                class="card"
                :class="{ 'card-selected': modelType === ModelType.scene }"
                @click="handleChooseModule(ModelType.scene)"
            >
                <img class="icon" src="@/assets/scene.png" alt="" />
                <div class="title">图像场景识别</div>
                <div class="des">上传多张图片，并对多个图像进行场景分类</div>
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
                <div class="des">对视频进行实时检索，快速分析视频片段</div>
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
.welcome-label1 {
    display: flex;
    justify-content: center;
    margin-top: 72px;
    font-family: DingTalk;
    font-size: 24px;
}
.welcome-label2 {
    display: flex;
    justify-content: center;
    margin-top: 48px;
    font-size: 14px;
    color: #3e4a54;
}
.modules {
    display: flex;
    justify-content: center;
    .card {
        width: 260px;
        height: 190px;
        padding: 32px 24px;
        margin-top: 64px;
        margin-bottom: 84px;
        margin-right: 20px;
        background: #ffffff;
        border-radius: 24px;
        box-shadow: 0px 4px 12px 0px rgba(58, 63, 74, 0.06);
        :last-child {
            margin-right: 0;
        }
        &:hover {
            cursor: pointer;
            border: 2px solid #629efc;
        }
        .icon {
            width: 32px;
            height: 32px;
        }
        .title {
            margin-top: 16px;
            margin-bottom: 12px;
            font-weight: 500;
            font-size: 18px;
            color: #3e4a54;
        }
        .des {
            width: 192px;
        }
    }
    .card-selected {
        border: 2px solid #629efc;
    }
}
.operation {
    display: flex;
    justify-content: center;
    .start-btn {
        height: 48px;
        width: 240px;
        border: none;
        background: linear-gradient(134deg, #739af6 0%, #3364f7 100%);
        ::v-deep .meg-button-words {
            font-size: 18px;
            font-weight: 500;
        }
    }
}
</style>
