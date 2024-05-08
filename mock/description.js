const Mock = require('mockjs');

const answer = Mock.mock({
    data: {
        answer: [
            "这是图片1的文字描述",
            "这是图片2的文字描述",
            "这是图片3的文字描述",
            "这是图片4的文字描述",
            "这是图片5的文字描述",
        ],
    }
});

export default [
    {
        url: '/web-mock/description',
        type: 'post',
        response: () => {
            return answer.data;
        }
    }
];

