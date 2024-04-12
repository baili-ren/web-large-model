<template>
    <div class="template-database-wrapper">
        <div class="title">您的问题在线查询结果如下：</div>
        <div class="title">
            {{ `一共出现${totalRules}种违规，一共${totalPoints}例` }}
        </div>

        <div v-show="detailData.length" class="detail-title">违规详情</div>
        <div
            v-for="(item, index) in detailData"
            :key="index + 'detail'"
            class="detail-content"
        >
            <div class="rule-name">
                {{ index + 1 }}. {{ item.rule_name }}: 共{{
                    item.videos.length
                }}条
            </div>
            <div class="video-block">
                <div
                    v-for="(subItem, index) in item.videos"
                    :key="index + 'imgbox'"
                    class="img-box"
                >
                    <img
                        class="frame"
                        :src="subItem.frame"
                        alt=""
                        @click="handleZoomImg(subItem.frame)"
                    />
                    <div class="video-name" :title="subItem.video_name">
                        {{ subItem.video_name }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 放大的图片 -->
        <div v-if="showImgMask" class="zoom-img-mask" @click="closeImgMask">
            <img
                class="close-icon"
                src="@/assets/close2.png"
                alt=""
                @click="closeImgMask"
            />
            <img class="zoom-img" :src="currZooImg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            detailData: [],
            totalRules: 0,
            totalPoints: 0,

            showImgMask: false,
            currZooImg: "",
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.detailData = this.content;

            let totalRules = 0;
            let totalPoints = 0;
            this.content.forEach((item) => {
                if (item.videos.length) {
                    totalRules++;
                }
                totalPoints = totalPoints + item.videos.length;
            });
            this.totalRules = totalRules;
            this.totalPoints = totalPoints;
        },
        handleZoomImg(img) {
            this.showImgMask = true;
            this.currZooImg = img;

            console.log("this.showImgMask", this.showImgMask);
        },
        closeImgMask() {
            this.showImgMask = false;
            this.currZooImg = "";
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
