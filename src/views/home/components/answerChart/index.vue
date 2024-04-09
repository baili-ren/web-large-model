<template>
    <div class="answer-chart-wrapper">
        <div class="chart-container" ref="pieChart"></div>
        <div class="chart-container" ref="barChart"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";

export default {
    data() {
        return {
            // 示例数据
            pieChartData: [
                { name: "愚人节", value: 1 },
                { name: "清明节", value: 2 },
                { name: "复活节", value: 3 },
                { name: "世界地球日", value: 4 },
            ],
            barChartData: {
                categories: ["A", "B", "C", "D"],
                data: [20, 30, 25, 35],
            },
        };
    },
    mounted() {
        this.renderPieChart();
        this.renderBarChart();
    },
    methods: {
        renderPieChart() {
            const pieChart = echarts.init(this.$refs.pieChart);

            const option = {
                title: {
                    text: "4月份节日分布饼图",
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                series: [
                    {
                        name: "节日",
                        type: "pie",
                        radius: "50%",
                        data: this.pieChartData.map((item) => ({
                            name: item.name,
                            value: item.value,
                        })),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };

            pieChart.setOption(option);
        },
        renderBarChart() {
            const barChart = echarts.init(this.$refs.barChart);

            const option = {
                title: {
                    text: "柱状图示例",
                },
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    data: this.barChartData.categories,
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "数据",
                        type: "bar",
                        data: this.barChartData.data,
                    },
                ],
            };

            barChart.setOption(option);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
