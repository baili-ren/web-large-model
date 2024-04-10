<template>
    <div class="template-database-wrapper">
        <div class="title">一共出现XXX起违规，分布在XX个点位中。</div>

        <div class="detail-title">违规详情</div>
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
import { img1 } from "./config";
export default {
    data() {
        return {
            detailData: [
                {
                    rule_name: "员工进入厨房工作时需佩戴厨师帽",
                    videos: [
                        {
                            video_name:
                                "点位5_1.mp4点位5_1.mp4点位5_1.mp4点位5_1.mp4",
                            frame: img1,
                        },
                        { video_name: "点位5_1.mp4", frame: img1 },
                        { video_name: "点位5_1.mp4", frame: img1 },
                        { video_name: "点位5_1.mp4", frame: img1 },
                        { video_name: "点位5_1.mp4", frame: img1 },
                    ],
                },
                {
                    rule_name: "条例2",
                    videos: [
                        { video_name: "点位5_1.mp4", frame: img1 },
                        { video_name: "点位5_1.mp4", frame: img1 },
                        { video_name: "点位5_1.mp4", frame: img1 },
                    ],
                },
            ],

            showImgMask: false,
            currZooImg: "",
        };
    },
    mounted() {},
    methods: {
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
