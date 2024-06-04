<template>
    <div class="template-database-wrapper">
        <div class="title">报告</div>
        <div class="summary-title">摘要</div>
        <div class="summary-content">
            <div class="summary-content-des">
                {{ `一共出现${totalPoints}例` }}
            </div>
            <div class="summary-content-chart">
                <div class="pie-chart" ref="barChartRef"></div>
                <div class="bar-chart" ref="pieChartRef"></div>
            </div>
        </div>

        <div class="detail-title">详情</div>
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
import { BarOption, PieOption } from "./config";
import { debounce } from "lodash";

export default {
    props: {
        content: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            barChart: null,
            pieChart: null,
            // 示例数据
            totalRules: 0,
            totalPoints: 0,
            pieChartData: [], // {name: '', value: number}
            barChartData: {
                categories: [], //label
                data: [], // value
            },
            detailData: [], // {rule_name: "", videos: [{video_name: "", frame: base64}]}
            showImgMask: false,
            currZooImg: "",
        };
    },
    mounted() {
        this.initData();
        this.initChart();
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize); // 组件销毁前移除事件监听
    },
    methods: {
        initData() {
            this.detailData = this.content;
            let totalRules = 0;
            let totalPoints = 0;

            let pieChartData = [];
            let barChartData = {
                categories: [],
                data: [],
            };
            this.content.forEach((item) => {
                if (item.videos.length) {
                    totalRules++;
                }
                totalPoints = totalPoints + item.videos.length;
                pieChartData.push({
                    name: item.rule_name,
                    value: item.videos.length,
                });
                barChartData["categories"].push(item.rule_name);
                barChartData["data"].push(item.videos.length);
            });
            this.totalRules = totalRules;
            this.totalPoints = totalPoints;
            this.pieChartData = pieChartData;
            this.barChartData = barChartData;
        },
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
                yAxis: { data: this.barChartData.categories.toReversed() },
            });
            this.barChart.setOption({
                series: { data: this.barChartData.data.toReversed() },
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
