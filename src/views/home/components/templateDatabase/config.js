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


export const img1 = 'data:image/png;base64,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'
