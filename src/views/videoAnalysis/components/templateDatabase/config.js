export const BarOption = {
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "value",
    },
    yAxis: {
        type: "category",
        data: [],
        axisLabel: {
            interval: 0, // 设置为 0，强制显示所有标签
            align: "right", // 将文本左对齐显示,
            textStyle: {
                textAlign: "center",
                color: "#3E4A54",
            },
        },
    },
    grid: {
        top: 20,
        left: 20, // 调整左边距，留出足够空间显示长文本
        bottom: 16,
        containLabel: true, // 自动计算坐标轴标签的位置，避免标签溢出
    },
    series: [
        {
            name: "次数",
            type: "bar",
            data: [],
            itemStyle: {
                color: function (params) {
                    const colors = [
                        "#797EEE",
                        "#4AD49F",
                        "#FF984A",
                        "#4098FF",
                        "#4ADFDD",
                        "#F46273",
                        "#FECB59",
                    ];
                    return colors[params.dataIndex % colors.length];
                },
            },
        },
    ],
};

export const PieOption = {
    title: {
        text: "违规事件统计",
        x: "center",
        y: "center",
        textStyle: {
            fontSize: "16",
            color: "#3E4A54",
            fontWeight: 500,
        },
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
    },

    series: [
        {
            name: "占比",
            type: "pie",
            radius: ["50%", "80%"],
            label: {
                show: false,
            },
            labelLine: {
                show: false,
            },
            data: [],
            itemStyle: {
                color: function (params) {
                    const colors = [
                        "#797EEE",
                        "#4AD49F",
                        "#FF984A",
                        "#4098FF",
                        "#4ADFDD",
                        "#F46273",
                        "#FECB59",
                    ];
                    return colors[params.dataIndex % colors.length];
                },
            },
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
