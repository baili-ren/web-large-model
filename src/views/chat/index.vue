<template>
    <div class="tabs">
        <PageTabs
            :tabConfig="tabConfig"
            :defaultKey="defaultTabKey"
            @tabChange="hanleTabChange"
        />
        <ImageSenmantics v-show="modelType === ModelType.senmantics" />
        <ImageScene v-show="modelType === ModelType.scene" />
        <ImageStructure v-show="modelType === ModelType.structure" />
        <VideoAnalysis v-show="modelType === ModelType.video" />
    </div>
</template>

<script>
import PageTabs from "@/components/PageTabs";
import ImageSenmantics from "./components/imageSenmantics";
import ImageScene from "./components/imageScene";
import ImageStructure from "./components/imageStructure";
import VideoAnalysis from "./components/videoAnalysis";
import { ModelType } from "@/constants/enums";

export default {
    components: {
        PageTabs,
        ImageSenmantics,
        ImageScene,
        ImageStructure,
        VideoAnalysis,
    },
    data() {
        return {
            ModelType,
            tabConfig: [
                {
                    value: ModelType.senmantics,
                    label: "语义识别",
                },
                {
                    value: ModelType.scene,
                    label: "场景识别",
                },
                {
                    value: ModelType.structure,
                    label: "结构化分析",
                },
                {
                    value: ModelType.video,
                    label: "视频检索",
                },
            ],
            defaultTabKey: "",
            modelType: "",
        };
    },
    mounted() {
        const { modelType = ModelType.senmantics } = this.$route.query;
        this.modelType = modelType;
        this.defaultTabKey = modelType;
    },
    methods: {
        hanleTabChange(v) {
            this.modelType = v;
            this.$router.replace({
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
