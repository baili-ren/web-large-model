<template>
    <div class="template-database-wrapper">
        <div class="title">报告名称: XXX</div>
        <div class="summary-title">摘要</div>
        <div class="summary-content">
            <div class="summary-content-des">
                一共出现XXX起违规，分布在XXX个点位中
            </div>
            <div class="summary-content-chart">
                <div class="pie-chart" ref="barChartRef"></div>
                <div class="bar-chart" ref="pieChartRef"></div>
            </div>
        </div>

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
import * as echarts from "echarts";
import { BarOption, PieOption, img1 } from "./config";
import { debounce } from "lodash";

export default {
    data() {
        return {
            barChart: null,
            pieChart: null,
            // 示例数据
            pieChartData: [
                { name: "员工进入厨房工作时需佩戴厨师帽1", value: 1 },
                { name: "员工进入厨房工作时需佩戴厨师帽", value: 2 },
                { name: "工作期间不得从事与厨房无关的活动1", value: 3 },
                { name: "工作期间不得从事与厨房无关的活动", value: 4 },
            ],
            barChartData: {
                categories: [
                    "员工进入厨房工作时需佩戴厨师帽",
                    "员工进入厨房工作时需佩戴厨师帽",
                    "工作期间不得从事与厨房无关的活动",
                    "工作期间不得从事与厨房无关的活动",
                    "工作期间不得从事与厨房无关的活动",
                    "工作期间不得从事与厨房无关的活动",
                    "工作期间不得从事与厨房无关的活动",
                    "工作期间不得从事与厨房无关的活动",
                ],
                data: [20, 30, 25, 35],
            },
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
    mounted() {
        this.initChart();
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize); // 组件销毁前移除事件监听
    },
    methods: {
        initChart() {
            this.barChart = echarts.init(this.$refs.barChartRef);
            this.pieChart = echarts.init(this.$refs.pieChartRef);
            this.barChart.setOption(BarOption);
            this.pieChart.setOption(PieOption);
            this.setBarChartData();
            this.setPieChartData();
        },
        setBarChartData() {
            this.barChart.setOption({
                yAxis: { data: this.barChartData.categories },
            });
            this.barChart.setOption({
                series: { data: this.barChartData.data },
            });
        },
        setPieChartData() {
            const newData = this.pieChartData.map((item) => ({
                name: item.name,
                value: item.value,
            }));
            this.pieChart.setOption({
                series: { data: newData },
            });
        },
        handleResize() {
            console.log("resize");
            this.barChart.resize(); // 调整 barChart 大小
            this.pieChart.resize(); // 调整 pieChart 大小
        },
        handleResizeDebounced: debounce(function () {
            this.handleResize();
        }, 300),

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
