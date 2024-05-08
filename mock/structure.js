const Mock = require('mockjs');

const answer = Mock.mock({
    data: {
        output_img: [],
    }
});

export default [
    {
        url: '/web-mock/scene',
        type: 'post',
        response: () => {
            return answer.data;
        }
    }
];
