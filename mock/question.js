const Mock = require('mockjs');

const answer = Mock.mock({
    data: {
        answer: '',
        infos: [
            {
                'rule_name': '请判断是否有人未戴帽子。（没有人回答否）',
                'videos': [
                    { 'video_name': '点位5_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位1_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位6_1.mp4', 'frame': 'yes' }
                ]
            },
            {
                'rule_name': '请判断是否有人未穿厨师服。（若没有人回答否）',
                'videos': [
                    { 'video_name': '点位5_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位1_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位6_1.mp4', 'frame': 'yes' }
                ]
            },
            {
                'rule_name': '请判断是否有人未戴口罩。（没有人回答否）',
                'videos': [
                    { 'video_name': '点位5_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位1_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位6_1.mp4', 'frame': 'yes' }
                ]
            },
            {
                'rule_name': '请判断是否有人在抽烟。（没有人回答否）',
                'videos': []
            },
            {
                'rule_name': '请判断是否有垃圾桶未盖盖。（没有桶回答否）',
                'videos': [
                    { 'video_name': '点位4_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位2_1.mp4', 'frame': 'yes' }
                ]
            },
            {
                'rule_name': '请判断是否有老鼠。',
                'videos': [
                    { 'video_name': '点位3_1.mp4', 'frame': 'yes' }
                ]
            },
            {
                'rule_name': '请判断是否有人玩手机。（没有人回答否）',
                'videos': [
                    { 'video_name': '点位5_1.mp4', 'frame': 'yes' },
                    { 'video_name': '点位6_1.mp4', 'frame': 'yes' }
                ]
            }
        ],
        template: "database"
    }
});

export default [
    {
        url: '/web-mock/question',
        type: 'post',
        response: () => {
            return answer.data;
        }
    }
];
